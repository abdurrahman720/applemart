interface BackDropProps

const BackDrop: React.FC<BackDropProps> = ({ onClick }) => {
    return ( 
        <div onClick={onClick} className="z-20 bg-slate-200 opcaity-50 w-screen h-screen fixed top-0 left-0">

        </div>
     );
}
 
export default BackDrop;