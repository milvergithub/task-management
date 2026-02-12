import { AxiosError } from "axios";

export function retryQuery(count: number, error: AxiosError) {
	const responseStatus = error.response?.status;
	return responseStatus === 401 && count < 3;
}
