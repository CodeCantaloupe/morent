import { useEffect } from "react";
import { useParams } from "react-router-dom"

const CarDetails = () => {
    const { id } = useParams();
    
    useEffect(() => {
        console.log(id)
    })

    return (
        <div>CarDetails</div>
    )
}

export default CarDetails