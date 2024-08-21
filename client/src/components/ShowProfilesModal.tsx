import { useState } from 'react';
import ProfileList from './ProfileList';
import { FaUserPen } from "react-icons/fa6";

const ShowProfilesModal: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return (
        <div>
            <button 
                className="btn btn-outline-success w-100 d-flex justify-content-center btn-sm"
                type="button"
                onClick={handleShow}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Show Profiles"
            >
                <div className="d-flex align-items-center text-nowrap">
                    {/* <IoEyeOutline className='me-2' size={20} /> */}
                    <FaUserPen className='me-2' size={20} />
                    Show Profiles
                </div>
            </button>

            <div className={`modal top ${showModal ? 'show' : ''}`} tabIndex={-1} style={{ display: showModal ? 'block' : 'none' }} aria-labelledby="showProfileModalLabel" aria-hidden={!showModal}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="showProfileModalLabel">Profiles</h5>
                            <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <ProfileList />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && <div className="modal-backdrop fade show"></div>}
        </div>
    );
};

export default ShowProfilesModal;
