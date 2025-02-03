import { useNavigate } from 'react-router-dom';
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/api";
import { useAuthContext } from '../contexts/AuthContext';

export const useAuth = () => {
    const navigate = useNavigate();
    const { login: authLogin } = useAuthContext();
    
    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
          
            if (data.token) {
                authLogin(data.token); 
                console.log('Token saved:', localStorage.getItem('token')); 
                navigate("/dashboard");
            }
        },
        onError: (error) => {
            console.error('Login error:', error);
        }
    });

    return {
        login: loginMutation.mutate,
        isLoading: loginMutation.isPending,
        error: loginMutation.error
    };
};