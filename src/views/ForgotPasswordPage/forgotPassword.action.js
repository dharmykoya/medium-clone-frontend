import axios from '../../utils/axiosConfig';
import { toast } from 'react-toastify';

export const forgotPasswordRequest = email => {
  return async () => {
    try {
      const response = await axios.post('users/forgot_password', email);
      if (response.status === 200) {
        toast.success(response.data.data.message);
      }
    } catch (error) {
      /* istanbul ignore next */
      if (error.message === 'Network Error') {
        return toast.error('Something went wrong. Please try Again');
      }
      toast.error(
        'Email address provided does not belong to any existing user'
      );
    }
  };
};
