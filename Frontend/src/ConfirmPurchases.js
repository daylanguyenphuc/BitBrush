import { Link } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { curentUser } from './Const';

const ConfirmPurchase = () => {
    const {id} = useParams();
    const {data: transaction, isLoading: isTransactionLoading, error: transactionError} = useFetch(`https://localhost:7145/Transaction/${id}`);

    return (  
        <Container maxWidth="xl" style={{ textAlign: 'center', display: 'block', margin: '50px auto' }}>
            <Typography variant="h1" gutterBottom style={{ margin: '50px 0' }}>Your purchase is completed!</Typography>
            <svg width="25%" height="25%" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_1028_5454)">
                    <path d="M256 48C311.165 48 364.071 69.9142 403.078 108.922C442.086 147.929 464 200.835 464 256C464 311.165 442.086 364.071 403.078 403.078C364.071 442.086 311.165 464 256 464C200.835 464 147.929 442.086 108.922 403.078C69.9142 364.071 48 311.165 48 256C48 200.835 69.9142 147.929 108.922 108.922C147.929 69.9142 200.835 48 256 48ZM256 512C323.895 512 389.01 485.029 437.019 437.019C485.029 389.01 512 323.895 512 256C512 188.105 485.029 122.99 437.019 74.9807C389.01 26.9714 323.895 0 256 0C188.105 0 122.99 26.9714 74.9807 74.9807C26.9714 122.99 0 188.105 0 256C0 323.895 26.9714 389.01 74.9807 437.019C122.99 485.029 188.105 512 256 512ZM369 209C378.4 199.6 378.4 184.4 369 175.1C359.6 165.8 344.4 165.7 335.1 175.1L224.1 286.1L177.1 239.1C167.7 229.7 152.5 229.7 143.2 239.1C133.9 248.5 133.8 263.7 143.2 273L207.2 337C216.6 346.4 231.8 346.4 241.1 337L369 209Z" fill="#00AC4F"/>
                </g>
                <defs>
                    <clipPath id="clip0_1028_5454">
                        <rect width="512" height="512" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
            <Typography variant="h5" gutterBottom style={{ marginTop: '50px' }}>Transaction ID: { transaction && transaction.id }</Typography>
            <Typography variant="body2" gutterBottom style={{ marginBottom: '50px' }}>Transaction hash: { transaction && transaction.hash }</Typography>
            <Button variant="contained">
                <Link to={`/nftdetail/${transaction && transaction.product.id}`} style={{ textDecoration: 'none', color: 'white' }}>
                    View my item
                </Link>
            </Button>
        </Container>
    );
}
 
export default ConfirmPurchase;