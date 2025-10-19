import api from "../api";

interface FeeHistory {
  id: number;
  student_id: number;
  fee_structure_id: number;
  reference: string;
  amount: string;
  status: "successful" | "pending" | "failed";
  gateway_response: string | null;
  payment_method: string | null;
  currency: string;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
  session_id: number;
  payment_type: "full" | "installment_first" | "installment_second";
  fee_structure: {
    id: number;
    amount: string;
    description: string;
    session_id: number;
    department_id: number;
    level: number;
    installment_first: string | null;
    installment_second: string | null;
    allow_installment: boolean;
    department: { id: number; name: string };
    session: { id: number; name: string };
  };
  session: { id: number; name: string };
}

interface PaymentStatus extends FeeHistory {
  student?: {
    id: number;
    reg_number: string;
    name: string;
    email: string;
    status: string;
    department_id: number;
    current_level: number | null;
  };
}

interface FeeHistoryResponse {
  current_page: number;
  data: FeeHistory[];
  last_page: number;
  total: number;
}

export const paymentService = {
  getFeeHistory: async (
    studentId: number,
    page: number
  ): Promise<FeeHistoryResponse> => {
    try {
      const response = await api.get("/api/payment/history", {
        params: { student_id: studentId, page },
      });
      return response.data;
    } catch (err: any) {
      throw new Error(
        err.response?.data?.message || "Failed to fetch fee history"
      );
    }
  },

  getPaymentStatus: async (
    reference: string,
    studentId: number
  ): Promise<PaymentStatus> => {
    try {
      const response = await api.get(`/api/payment/status/${reference}`, {
        params: { student_id: studentId },
      });
      return response.data;
    } catch (err: any) {
      throw new Error(
        err.response?.data?.message || "Failed to fetch payment status"
      );
    }
  },
};
