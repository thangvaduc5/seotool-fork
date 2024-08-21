import { useContext, useState, useEffect } from 'react'
import SpinnerLoading from '../utils/SpinnerLoading'
import axios from 'axios'
import ProfileContext, { ProfileContextType, Profile } from '../context/ProfileContext'
import AddEditModal from "../components/shared/AddEditModal";
import ShowProfilesModal from '../components/ShowProfilesModal';

const CommentPage: React.FC = () => {
  const { profiles, addProfile } = useContext(ProfileContext) as ProfileContextType
  const [loading, setLoading] = useState<boolean>(false)
  const [dataResp, setDataResp] = useState<string[]>([])
  const [numSuccess, setNumSuccess] = useState<number>(0)

  const handleCreate = (data: Profile) => {
    if (addProfile) {
      addProfile(data);
    }
    console.log('Created Profile with:', data);
  };

  // input data & send request
  const [textareaValue, setTextareaValue] = useState<string>('')
  const [selectedProfileId, setSelectedProfileId] = useState('')

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        let text = e.target?.result as string
        // Remove surrounding quotation marks from each line
        text = text
          .split('\n')
          .map((line) => line.trim().replace(/^"|"$/g, ''))
          .join('\n')
        setTextareaValue(text)
      }
      reader.readAsText(file)
    }
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value)
    console.log(e.target.value)
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProfileId(e.target.value)
    console.log(e.target.value)
  }

  const URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const urlsArray = textareaValue
      .split('\n')
      .filter((url) => url.trim() !== '')
    try {
      const loginURL: string = `${URL}/seo/comment`
      const response = await axios.post(loginURL, {
        profileId: selectedProfileId,
        urls: urlsArray,
      }, {withCredentials: true})
      console.log(response)
      const { result, success } = response.data.data
      setNumSuccess(success)
      setDataResp(result)
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
    }
  }
  // -------------------------------------------- //

  // Page fade in at render
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 0); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

  const containerStyle = {
    opacity: fadeIn ? 1 : 0,
    transition: 'opacity 0.5s ease-in-out',
  };
  // -------------------------------------------- //

  return (
    <div className="container mt-5" style={containerStyle}>
      <h1 className="mb-4">Auto Comment</h1>
      <div className="row">
        {/* COMMENT STATUS */}
        <div className="col-md-6 d-flex flex-column">
          <h4>STATUS</h4>
          <div className="row overflow-auto" style={{ maxHeight: '240px' }}>
            {loading ? (
              <SpinnerLoading />
            ) : (
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">URL</th>
                    <th scope="col">State</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Mock data for status table */}
                  {dataResp.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td
                          className="text-truncate"
                          style={{ maxWidth: '150px' }}
                        >
                          {item[0]}
                        </td>
                        <td>{item[1]}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
          {numSuccess > 0 && (
            <div>
              Success: {numSuccess}/{dataResp.length}
            </div>
          )}
        </div>

        {/* INPUT DATA */}
        <div className="col-md-6">
          <h4>URLs</h4>
          <div className="d-none d-lg-flex gap-3 mb-3">
            <AddEditModal mode="create" onSubmit={handleCreate} />
            <ShowProfilesModal />
          </div>
          <div className="d-lg-none mb-3">
            <div className="row mb-3">
              <AddEditModal mode="create" onSubmit={handleCreate} />
            </div>
            <div className="row">
              <ShowProfilesModal />
            </div>
          </div>

          <form className='form-floating' onSubmit={handleSubmit}>

            <textarea
              className="form-control mb-3"
              placeholder="" // for the bootstrap floating label effect, can leave blank
              id="floatingTextarea"
              // rows={10} // because textarea with floating label can not use rows attribute
              style={{ height: '150px' }}
              onChange={handleTextareaChange}
              value={textareaValue}
              required
            ></textarea>
            <label
              className='text-black-50'
              htmlFor="floatingTextarea"
            >Upload .csv file or input URLs manually</label>

            <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
              <select
                className="form-select w-50"
                aria-label="Default select example"
                style={{ cursor: 'pointer' }}
                value={selectedProfileId}
                onChange={handleSelectChange}
                required
              >
                <option value="" disabled>
                  Choose a profile
                </option>
                {profiles?.map((profile, index) => (
                  <option value={profile._id} key={index}>
                    {profile.name}
                  </option>
                ))}
              </select>

              <label
                className="btn btn-outline-primary text-nowrap"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Only .csv files"
              >
                <i className="fa fa-upload me-2" aria-hidden="true"></i>Upload CSV
                <input
                  type="file"
                  className="d-none"
                  accept=".csv"
                  onChange={handleCSVUpload}
                />
              </label>

              {/* Bootstrap select default */}
              {/* <div className=""
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Only .csv files">
                <input className="form-control"
                  type="file"
                  id="formFile"
                  accept=".csv"
                  onChange={handleCSVUpload} />
              </div> */}

            </div>

            <button
              type="submit"
              className="btn btn-success w-100 mb-3"
              disabled={loading || !selectedProfileId || !textareaValue}
            >
              START
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CommentPage
