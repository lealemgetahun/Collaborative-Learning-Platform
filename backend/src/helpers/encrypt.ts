import bcrypt from 'bcrypt';

export const encrypt = async (password: string | Buffer) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
