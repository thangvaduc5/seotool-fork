import { useState } from 'react'
import { Profile } from '../../context/ProfileContext'
import { FaUserPlus } from "react-icons/fa6";

interface ProfileModalProps {
  mode: 'create' | 'edit'
  onSubmit: (data: Profile) => void // Adjust the type of data as needed
  profile?: Profile
}

const ProfileModal: React.FC<ProfileModalProps> = ({ mode, onSubmit, profile }) => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState<Profile>({
        _id: profile?._id || '',
        name: profile?.name || '',
        website: profile?.website || '',
        phone: profile?.phone || '',
        email: profile?.email || '',
        comment: profile?.comment || '',
    });

  const handleShow = () => setShowModal(true)
  const handleClose = () => setShowModal(false)

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (mode === 'create') {
            delete formData._id;  // Ensure _id is not sent when creating a new profile
        }
        onSubmit(formData);
        handleClose();
    };

  return (
    <div>
      <button
        className={`btn ${
          mode === 'create'
            ? 'btn-warning w-100 d-flex justify-content-center btn-sm'
            : 'btn-success btn-sm rounded-0'
        }`}
        type="button"
        onClick={handleShow}
        data-toggle="tooltip"
        data-placement="top"
        title={mode === 'create' ? 'Create Profile' : 'Edit Profile'}
      >
        {mode === 'create' ? (
          <div className='d-flex align-items-center text-nowrap'>
            <FaUserPlus className='ms-1 me-2' size={20} />Create Profile
          </div>
          // <i className="fa fa-plus" aria-hidden="true"></i>
          // 'Create Profile'
        ) : (
          <i className="fa fa-pencil-square-o"></i>
        )}
      </button>

      <div
        className={`modal top ${showModal ? 'show' : ''}`}
        tabIndex={-1}
        style={{ display: showModal ? 'block' : 'none' }}
        aria-labelledby="exampleModalLabel"
        aria-hidden={!showModal}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {mode === 'create' ? 'Create a Profile' : 'Edit Profile'}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleFormSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        Name:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">
                        Phone:
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Email:
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="website" className="form-label">
                        Website:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="comment" className="form-label">
                    Comment:
                  </label>
                  <textarea
                    className="form-control"
                    id="comment"
                    name="comment"
                    rows={4}
                    value={formData.comment}
                    onChange={handleFormChange}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  {mode === 'create' ? 'Create Profile' : 'Save Changes'}
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  )
}

export default ProfileModal
