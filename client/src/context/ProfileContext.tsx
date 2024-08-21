import React, { createContext, useState, useEffect, ReactNode } from 'react'
// import ProfileData from '../data/ProfileData';
import axios from 'axios'

// DATA
export interface Profile {
  _id?: string
  name: string
  website: string
  phone: string
  email: string
  comment: string
}

// CONTEXT
export interface ProfileContextType {
  profiles: Profile[] | null;
  addProfile?: (profile: Profile) => void;
  editProfile?: (profile: Profile) => void;
  deleteProfile?: (id: string) => void;
  isLoading: boolean;
  error: string | null;
}

interface ProfileProviderProps {
  children: ReactNode
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)
const URL = import.meta.env.VITE_API_URL;

export const ProfileProvider: React.FC<ProfileProviderProps> = ({
  children,
}) => {
  const [profiles, setProfiles] = useState<Profile[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfiles = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(`${URL}/seo/profiles`)
        setProfiles(response.data.profiles)
        console.log(response.data.profiles)
      } catch (error) {
        setError('Failed to fetch data')
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfiles();
  }, []);

  const addProfile = async (profile: Profile) => {
    try {
      const response = await axios.post(`${URL}/seo/profiles`, profile, {withCredentials: true});
      const newProfile = response.data.newProfile; // .newPost cua server
      console.log(newProfile);
      setProfiles((prevProfiles) => {
        console.log([...prevProfiles ?? [], newProfile])
        return (prevProfiles ? [...prevProfiles, newProfile] : [newProfile])
      })
    } catch (error) {
      console.error('Error adding profile:', error)
      setError('Failed to add profile')
    }
  }

  const editProfile = async (profile: Profile) => {
    try {
      const response = await axios.put(`${URL}/seo/profiles/${profile._id}`, profile, {withCredentials: true});
      console.log(profile)
      const updatedProfile = response.data.updatedProfile; // .updatedPost cua server
      setProfiles((prevProfiles) =>
        prevProfiles
          ? prevProfiles.map((p) => (p._id === profile._id ? updatedProfile : p))
          : [updatedProfile]
      );
    } catch (error) {
      console.error('Error editing profile:', error);
      setError('Failed to edit profile');
    }
  };

  const deleteProfile = async (id: string) => {
    try {
      if (window.confirm('Are you sure you want to delete this profile?')) {
        await axios.delete(`${URL}/seo/profiles/${id}`, {withCredentials: true});
        setProfiles((prevProfiles) => (prevProfiles ? prevProfiles.filter(profile => profile._id !== id) : null));
      }
    } catch (error) {
      console.error('Error deleting profile:', error)
      setError('Failed to delete profile')
    }
  }

  const contextValue = {
    profiles,
    addProfile,
    editProfile,
    deleteProfile,
    isLoading,
    error,
  }

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  )
}

export default ProfileContext
