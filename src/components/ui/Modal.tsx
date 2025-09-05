interface FilterProms {
    title?: string;
    show: boolean;
    onClose: () => void;
    footer?: React.ReactNode;
    children?: React.ReactNode;
}

function Modal({ show = false, onClose, title = "", children, footer }: FilterProms) {
    if (!show) return null;

    return (
        <div className="position-fixed top-0 start-0 w-100 vh-100 bg-dark bg-opacity-50 z-3 d-flex" onClick={onClose} >
            <div className="card text-center z-3 m-auto " style={{ width: "30rem" }} onClick={e => e.stopPropagation()} // Evita cerrar al hacer click dentro del modal
            >
                <div className="card-header">
                    {title}
                </div>
                <div className="card-body">
                    {children}
                </div>
                <div className="card-footer text-muted">
                    {footer}
                </div>
            </div>
        </div>
    );
}

export default Modal;