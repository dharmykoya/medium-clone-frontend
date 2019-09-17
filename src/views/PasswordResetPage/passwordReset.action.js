import axios from '../../utils/axiosConfig';
import { toast } from 'react-toastify';

export const passwordResetRequest = (location, history, newPassword) => {
  return async () => {
    try {
      const response = await axios.patch(
        `users/password_reset${location}`,
        newPassword
      );
      if (response.status === 200) {
        toast.success(response.data.data.message);
        history.push('/login');
      }
    } catch (error) {
      /* istanbul ignore next */
      if (error.message === 'Network Error') {
        return toast.error('Something went wrong. Please try Again');
      }
      toast.error(
        'Kindly check the email address as it does not belong to an existing account'
      );
    }
  };
};
