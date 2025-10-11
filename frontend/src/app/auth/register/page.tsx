"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import * as validate from "@/utils/validate";
import { cleanObjectStrict } from "@/utils";
import { RegisterStudentRequest } from "@/types";
import {
  Logo,
  AuthInput,
  AuthButton,
  SuccessCircle,
} from "@/components";
import { Eye, EyeOff } from "lucide-react";

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const { register, isLoading } = useAuth();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Tách họ và tên từ fullName
    const nameParts = formData.fullName.trim().split(' ');
    const firstName = nameParts.pop() || ""; // Lấy từ cuối cùng làm tên
    const lastName = nameParts.join(' '); // Phần còn lại làm họ

    // Validate các trường
    if (!validate.validateName(firstName, lastName)) return;
    if (!validate.validateEmail(formData.email)) return;
    if (!validate.validatePassword(formData.password)) return;
    if (!validate.validateConfirmPassword(formData.password, confirmPassword)) return;

    // Tạo data để gửi API với các trường bắt buộc từ RegisterStudentRequest
    const registerData: RegisterStudentRequest = {
      lastName: lastName,
      firstName: firstName,
      username: formData.email, // Sử dụng email làm username
      gender: undefined,
      dateOfBirth: undefined,
      school: "",
      grade: undefined,
      email: formData.email,
      password: formData.password,
    };

    const cleanFormData = cleanObjectStrict(registerData);

    const resultAction = await register(cleanFormData);
    if (resultAction.meta.requestStatus === "fulfilled") {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className='flex w-full justify-center items-center flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-10'>
        <div className="flex flex-col justify-center items-center gap-4 sm:gap-6 md:gap-8">
          <div className="flex justify-center items-center">
            <SuccessCircle />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary text-center">
            Đăng ký thành công!
          </h2>
          <p className="text-gray-600 text-center text-sm sm:text-base md:text-lg">
            Tài khoản của bạn đã được tạo thành công. Bạn có thể đăng nhập ngay bây giờ.
          </p>
        </div>
        <AuthButton
          onClick={() => router.push("/auth/login")}
          variant="primary"
        >
          <div className="text-white text-sm sm:text-base md:text-lg">
            Đăng nhập ngay
          </div>
        </AuthButton>
      </div>
    );
  }

  return (
    <div className='flex w-full justify-center items-center flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-10'>
      <div className='flex w-full flex-col justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-15'>
        <div className='flex w-full justify-center sm:justify-start items-center gap-3 sm:gap-4 md:gap-6 flex-col sm:flex-row'>
          <Logo />
          <p className="text-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-open-sans text-center sm:text-left">
            Đăng ký
          </p>
        </div>
      </div>
      <form
        className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 w-full"
        onSubmit={handleRegister}
      >
        <AuthInput
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          label="Họ và tên"
          type="text"
          required
        />

        <AuthInput
          name="email"
          value={formData.email}
          onChange={handleChange}
          label="Email"
          type="email"
          required
        />

        <AuthInput
          name="password"
          value={formData.password}
          onChange={handleChange}
          label="Mật khẩu"
          type={showPassword ? "text" : "password"}
          required
          rightIcon={
            <button 
              type="button" 
              className='cursor-pointer' 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          }
        />

        <AuthInput
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          label="Nhập lại mật khẩu"
          type={showConfirmPassword ? "text" : "password"}
          required
          rightIcon={
            <button 
              type="button" 
              className='cursor-pointer' 
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          }
        />

        <AuthButton
          type='submit'
          variant='primary'
          isLoading={isLoading}
        >
          <div className="text-white text-sm sm:text-base md:text-lg">
            Đăng ký
          </div>
        </AuthButton>

        <div className="w-full flex justify-center items-center">
          <p className="text-center">
            <span className="text-black text-sm sm:text-base md:text-lg font-normal font-open-sans">
              Đã có tài khoản?{" "}
            </span>
            <Link
              href="/auth/login"
              className="hover:underline cursor-pointer text-primary text-sm sm:text-base md:text-lg font-semibold font-open-sans"
            >
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
