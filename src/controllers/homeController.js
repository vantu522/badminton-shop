const {UserModel, OrderModel} = require('../models/user');

const getHomePage = async (req, res) => {
    const users = await UserModel.find();
    res.render('home.ejs', { title: "Trang chủ", users });
};

const addUserPage = (req, res) => {
    res.render('contact.ejs', { title: "Liên hệ",});
};

const addUser = async (req, res) => {
    const { name, email, phone, content } = req.body;
    const newUser = new UserModel({ name, email, phone, content });
    await newUser.save();
    req.session.message = {
        type: 'success',
        message: 'User added successfully'
    };
    res.redirect('/');
};




const editUserPage = async (req, res) => {
    const user = await UserModel.findById(req.params.id);
    res.render('edit_user.ejs', { title: "Edit User", user });
};


const updateUser = async (req, res) => {
    const { name, email, phone, content } = req.body;
    await UserModel.findByIdAndUpdate(req.params.id, { name, email, phone, content });
    req.session.message = {
        type: 'success',
        message: 'User updated successfully'
    };
    res.redirect('/admin');
};




const deleteUser = async (req, res) => {
    await UserModel.findByIdAndDelete(req.params.id);
    req.session.message = {
        type: 'success',
        message: 'User deleted successfully'
    };
    res.redirect('/admin');
};


const getProduct = async(req, res) =>{
    res.render('badminton.ejs', {title: "Sản Phẩm"})
}

const loginUser = async(req,res) =>{
    res.render('login.ejs', { title: "Đăng nhập"});
}

const logins = async(req, res) => {
    // Giả sử bạn đã xác thực người dùng thành công
    req.session.isAuthenticated = true;
    res.redirect('/');
};

const logoutUser = async(req, res) =>{
    req.session.destroy((err) =>{
        if(err) {
            return res.redirect("/");
        }
        res.redirect("/login")
    })
}

const getNews = async(req, res) =>{
    res.render('news.ejs', { title: "Tin Tức"} )
}

const desYonex88d = async(req,res) =>{
    res.render('yonex-88d.ejs', { title: 'Vợt'})
}

const loginAdmin = async(req, res) =>{
    res.render('login-admin.ejs', {title: ' Đăng nhập'})
}

const loginsAdmin = async(req, res) => {
    // Xác thực người dùng thành công
    res.redirect('/admin');
};
 
const admin = async(req, res) =>{
    const users = await UserModel.find();

    res.render('admin.ejs', { title: 'Admin', users})
}

const order = async(req, res) =>{
    const orders = await OrderModel.find();
    res.render('order.ejs', {title: 'Đặt hàng', orders })
} 


module.exports = {
    getHomePage,
    addUserPage,
    addUser,
    editUserPage,
    updateUser,
    deleteUser,
    loginUser,
    getProduct,
    desYonex88d,
    getNews,
    logins,
    logoutUser,
    loginAdmin,
    loginsAdmin,
    admin,
    order

    
};
