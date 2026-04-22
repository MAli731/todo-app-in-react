import React from 'react';

type Props = {
    listModal: boolean;
    detailModal: boolean;
    filteredTodos: any[];
    selectedDate: string;
    setListModal: (value: boolean) => void;
    setDetailModal: (value: boolean) => void;
    setSelectedTodo: (value: any) => void;
};

export default function ListModal({
    listModal,
    detailModal,
    filteredTodos,
    selectedDate,
    setListModal,
    setDetailModal,
    setSelectedTodo
}: Props) {

    return (
        <>
            {listModal && (
                <div
                    className="modal d-block"
                    style={{
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        backdropFilter: detailModal ? 'blur(5px)' : 'none'
                    }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div
                            className="modal-content"
                            style={{
                                opacity: detailModal ? 0.6 : 1,
                                pointerEvents: detailModal ? 'none' : 'auto'
                            }}
                        >
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">
                                    Tasks for this Date: {selectedDate}
                                </h5>

                                <button
                                    className="btn-close btn-close-white"
                                    onClick={() => setListModal(false)}
                                />
                            </div>

                            <div className="modal-body">
                                {filteredTodos.length > 0 ? (
                                    filteredTodos.map(todo => (
                                        <div
                                            key={todo.id}
                                            className="d-flex justify-content-between align-items-center mb-2 border p-2 rounded"
                                        >
                                            <span
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => {
                                                    setSelectedTodo(todo);
                                                    setDetailModal(true);
                                                }}
                                            >
                                                {todo.title}
                                            </span>

                                            <button className="btn btn-sm btn-warning">
                                                {todo.status}
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center">No tasks</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}