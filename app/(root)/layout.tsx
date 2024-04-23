import Navbar from "@/components/Navbar";
import SignOut from "@/components/signout";

const RoutesLayout = ({
    children
} : {
    children : React.ReactNode
}) => {
    return ( 
        <div className="pt-5 px-5">
          <Navbar />
          <SignOut />
          <div className="rounded-xl shadow-lg w-3/4 ml-[350px] h-[500px]">
            {children}
          </div>
        </div>
     );
}
 
export default RoutesLayout;