import React from 'react';

type Props = {
    detailModal: boolean;
    selectedTodo: any;
    setDetailModal: (value: boolean) => void;
};

export default function DetailModal({
    detailModal,
    selectedTodo,
    setDetailModal
}: Props) {

    return (
        <>
            {detailModal && selectedTodo && (
                <div
                    className="modal d-block"
                    style={{
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 1050,
                    }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">

                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">Task Details</h5>

                                <button
                                    className="btn-close btn-close-white"
                                    onClick={() => setDetailModal(false)}
                                />
                            </div>

                            <div className="modal-body">
                                <div className="container border p-2 rounded">
                                    <p><strong>Title:</strong> {selectedTodo.title}</p>
                                    <p><strong>Description:</strong> {selectedTodo.desc}</p>
                                    <p><strong>Status:</strong> {selectedTodo.status}</p>
                                    <p><strong>Time:</strong> {selectedTodo.time}</p>
                                    <p><strong>Date:</strong> {selectedTodo.date}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
}