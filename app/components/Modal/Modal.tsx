import { useState, FormEvent } from 'react';
import Modal from 'react-modal';
import Rating from '@mui/material/Rating';

type Comment = {
    user: string,
    description: string,
    calification: number
};

type Product = {
    id: number;
    name: string;
    photo: string[];
    description: string;
    price: string;
    services: string[];
    comments: Comment[];
};

type ModalCommentsProps = {
    modalIsOpen: boolean;
    closeModal: () => void;
    data: Product;
};

export function ModalComments({ modalIsOpen, closeModal, data }: ModalCommentsProps) {
    const [commentText, setCommentText] = useState<string>("");
    const [star, setStar] = useState<number>(0)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (commentText.trim()) {
            const newComment: Comment = {
                user: "Anónimo",
                description: commentText,
                calification: star
            };

            data.comments.push(newComment)

            try {
                const response = await fetch('/api/sellers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();
                console.log(result);
            } catch (error) {
                console.error('Error importing data:', error);
            }
            
            setCommentText("");
        }
    };

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            className="modal"
            overlayClassName="modal-overlay"
        >
            <button className='relative top-[-30px] left-[500px]' onClick={closeModal}>X</button>
            <div>
                <h2 className='relative top-[-60px] right-10 text-2xl font-bold mb-4'>Comentarios</h2>
                <form onSubmit={handleSubmit}>
                    <textarea
                        name='comment'
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder='Escribe tu comentario...'
                        className='border border-gray-300 p-2 rounded-md w-full'
                    ></textarea>
                    <button className='bg-blue-600 text-white py-2 px-2 rounded-md'>Añadir Comentario</button>
                    <Rating
                        name="half-rating"
                        defaultValue={0}
                        precision={0.5}
                        onChange={(event, newValue) => {
                            setStar(newValue || 0)
                        }}
                    />
                </form>
                <div className='flex flex-col gap-4 limit-group-form'>
                    {data.comments.map((comment, index) => (
                        <div key={index} className=' p-4 rounded-md'>
                            {comment.description}
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    )
}