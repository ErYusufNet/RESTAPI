import mongoose from "mongoose";  // Mongoose modülünü içe aktarıyoruz. (MongoDB ile etkileşim için)
import { idText } from "typescript";

// Kullanıcı şeması oluşturuyoruz.
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },  // Kullanıcının ismini tutan alan (String türünde ve zorunlu)
    email: { type: String, required: true },  // Kullanıcının e-posta adresi (String türünde ve zorunlu)

    authentication: {  // Kullanıcının giriş bilgilerini içeren nesne
        password: { type: String, required: true, select: false },  // Şifre (Güvenlik için varsayılan olarak get edilmeyecek)
        sessionToken: { type: String, select: false }  // Kullanıcının oturum belirteci (Güvenlik için varsayılan olarak get edilmeyecek)
    }
});

// Modeli oluşturuyoruz ve dışa aktarıyoruz.
const UserModel = mongoose.model("User", UserSchema);
export default UserModel;

// Tüm kullanıcıları getirir.
export const getUsers = () => UserModel.find();

// E-posta adresine göre kullanıcıyı bulur.
export const getUserByMail = (email: string) => UserModel.findOne({ email });

// Oturum belirtecine göre kullanıcıyı getirir.
export const getUserBySessionToken = (sessionToken: string) =>
    UserModel.findOne({ 'authentication.sessionToken': sessionToken });

// Kullanıcıyı ID'ye göre getirir.
export const getUserById = (id: string) => UserModel.findById(id);

// Yeni bir kullanıcı oluşturur ve MongoDB'ye kaydeder.
export const CreateUser = (values: Record<string, any>) =>
    new UserModel(values)
        .save()
        .then((user) => user.toObject()); // Kullanıcı nesnesini nesne olarak döndürür.

// ID'ye göre kullanıcıyı siler.
export const deleteUserById = (id: string) =>
    UserModel.findOneAndDelete({ _id: id });

// ID'ye göre kullanıcıyı günceller.
export const updateUserById = (id: string, values: Record<string, any>) =>
    UserModel.findByIdAndUpdate(id, values);