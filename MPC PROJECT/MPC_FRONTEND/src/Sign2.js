import axios from 'axios';

export const Sign2 = async (inputValue) => {
    try {

        let response = await
            axios('http://localhost:3002/Sign2', {
                method: 'POST',
                data: { message: inputValue },
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Origin": "*",
                }
            })
        return response

    } catch (error) {
        
    }
}