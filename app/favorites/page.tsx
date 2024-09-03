"use client";

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useLocalStorage } from '../components/LocalStorage/LocalStorage';
import { useEffect, useState } from 'react';
// import Image from 'next/image';

interface Comment {
    user: string;
    description: string;
    calification: number;
}

interface Product {
    id: number;
    name: string;
    photo: string[];
    description: string;
    price: number;
    services: string[];
    comments: Comment[];
    quantity: number;
}

const CartPage = () => {
    const [cartItems, setCartItems] = useLocalStorage('fav', []) as [
        Product[],
        React.Dispatch<React.SetStateAction<Product[]>>
    ];
    const [totalAmount, setTotalAmount] = useState(0);
    const [preferenceId, setPreferenceId] = useState(null)

    initMercadoPago("APP_USR-d0db9a39-57e5-4d30-8517-2e586ed303ad", {
        locale: "es-CO"
    })

    useEffect(() => {
        console.log(cartItems)
        calculateTotal();
        setTimeout(() => {
            fetch("/api/checkout", {
                method: "POST",
                body: JSON.stringify(cartItems)
            })
                .then(resp => resp.json())
                .then(data => {
                    const { id } = data;
                    setPreferenceId(id);
                })
                .catch(err => {
                    console.log(err);
                });
        }, 2000);
    }, [cartItems]);

    const calculateTotal = () => {
        const total = cartItems.reduce(
            (acc, item) => acc + Number(item.price.replace("$", "")) * item.quantity,
            0
        );
        setTotalAmount(total);
    };

    const handleQuantityChange = (productId: number, quantity: number) => {
        const updatedCart = cartItems.map((item) =>
            item.id === productId ? { ...item, quantity: quantity } : item
        );
        setCartItems(updatedCart);
    };

    const removeItem = (productId: number) => {
        const updatedCart = cartItems.filter((item) => item.id !== productId);
        setCartItems(updatedCart);
    };

    return (
        <div className="min-h-screen p-4">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-500 dark:text-white">
                Carrito de Compras
            </h1>
            {cartItems.length === 0 ? (
                <div className="text-center text-gray-600">
                    <p>Tu carrito está vacío.</p>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Lista de productos */}
                    <div className="lg:col-span-2">
                        <div className="shadow-md rounded-lg p-4">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="text-left border-b">
                                        <th className="pb-2">Producto</th>
                                        <th className="pb-2">Precio Unitario</th>
                                        <th className="pb-2">Cantidad</th>
                                        <th className="pb-2">Total</th>
                                        <th className="pb-2">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((product) => (
                                        <tr key={product.id} className="border-b">
                                            <td className="py-4 flex items-center">
                                                <img
                                                    src={product.photo[0]}
                                                    alt={product.name}
                                                    width={80}
                                                    height={80}
                                                    className="rounded-md object-cover"
                                                />
                                                <span className="ml-4 text-gray-700">
                                                    {product.name}
                                                </span>
                                            </td>
                                            <td className="py-4 text-gray-700">
                                                {Number(product.price.replace("$", ""))}
                                            </td>
                                            <td className="py-4">
                                                <div className="flex items-center">
                                                    <button
                                                        onClick={() =>
                                                            handleQuantityChange(
                                                                product.id,
                                                                product.quantity > 1
                                                                    ? product.quantity - 1
                                                                    : 1
                                                            )
                                                        }
                                                        className="px-2 py-1 bg-gray-200 text-gray-700 rounded-l"
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={product.quantity}
                                                        onChange={(e) =>
                                                            handleQuantityChange(
                                                                product.id,
                                                                Number(e.target.value)
                                                            )
                                                        }
                                                        className="bg-gray-100 w-12 text-center border-t border-b border-gray-200 dark:text-black"
                                                    />
                                                    <button
                                                        onClick={() =>
                                                            handleQuantityChange(
                                                                product.id,
                                                                product.quantity + 1
                                                            )
                                                        }
                                                        className="px-2 py-1 bg-gray-200 text-gray-700 rounded-r"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="py-4 text-gray-700">
                                                {product.quantity * Number(product.price.replace("$", ""))}
                                            </td>
                                            <td className="py-4">
                                                <button
                                                    onClick={() => removeItem(product.id)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Resumen de compra */}
                    <div>
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                                Resumen de Compra
                            </h2>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-700">Subtotal</span>
                                <span className="text-gray-700">
                                    ${totalAmount}
                                </span>
                            </div>
                            <div className="flex justify-between mb-4">
                                <span className="text-gray-700">Envío</span>
                                <span className="text-gray-700">$0.00</span>
                            </div>
                            <div className="flex justify-between mb-6 border-t pt-4">
                                <span className="text-xl font-bold text-gray-800">Total</span>
                                <span className="text-xl font-bold text-gray-800">
                                    ${totalAmount}
                                </span>
                            </div>
                            {preferenceId && <Wallet initialization={{ preferenceId }} />}
                            {/* <a href="/checkout">
                                <button className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300">
                                    Proceder al Pago
                                </button>
                            </a> */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;