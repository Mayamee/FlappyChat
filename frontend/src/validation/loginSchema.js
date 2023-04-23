import * as yup from 'yup';

export default yup.object().shape({
  login: yup.string().required(),
  password: yup.string().required(),
});
