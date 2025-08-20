import userIcon from '../assets/icons/user.svg'

const Login = () => {
    return (
        <article className="flex justify-end mr-3 mt-1">
            <button className="border-none text-gray-500">
                Ingresar
                <img src={userIcon} alt="User Icon" className="inline-block ml-1" />
            </button>
        </article>
    )
};

export default Login;