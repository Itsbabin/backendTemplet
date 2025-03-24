import Admin from '../../models/Admin.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

    const loginAdmin = async (req, res) => {
        const { phone_number, password } = req.body;
               
        try {

            const admin = await Admin.findOne({ userid: phone_number });
            if (!admin) {
                return res.status(404).json({ message: 'Admin not found' });
            }

            // Check if password is correct
            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'password not matched' });
            }

            // Generate JWT token
            const token = jwt.sign({ id: admin.userid }, process.env.SECRET, { expiresIn: '2h' });

            res.status(200).json({ token });
        } catch (error) {
            console.log(error);
            
            res.status(500).json({ message: 'Server error' });
        }
    };

    export default loginAdmin;