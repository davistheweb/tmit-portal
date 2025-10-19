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

interface Session {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface InitiatePaymentRequest {
  student_id: number;
  session_id: number;
  level: number;
  payment_type: "full" | "installment_first" | "installment_second";
}

interface InitiatePaymentResponse {
  message: string;
  payment: {
    id: number;
    student_id: number;
    fee_structure_id: number;
    session_id: number;
    reference: string;
    amount: string;
    payment_type: "full" | "installment_first" | "installment_second";
    status: "pending";
    created_at: string;
    updated_at: string;
    fee_structure?: {
      id: number;
      description: string;
      session: { id: number; name: string };
    };
  };
  paystack: {
    status: boolean;
    message: string;
    data: {
      authorization_url: string;
      access_code: string;
      reference: string;
    };
  };
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

  initiatePayment: async (
    data: InitiatePaymentRequest
  ): Promise<InitiatePaymentResponse> => {
    try {
      const response = await api.post("/api/payment/initiate", data);
      return response.data;
    } catch (err: any) {
      throw new Error(
        err.response?.data?.message || "Failed to initiate payment"
      );
    }
  },
};

export const dummySessions: Session[] = [
  {
    id: 3,
    name: "2025/2026",
    start_date: "2025-10-25T00:00:00.000000Z",
    end_date: "2025-10-31T00:00:00.000000Z",
    is_active: true,
    created_at: "2025-10-19T07:16:36.000000Z",
    updated_at: "2025-10-19T12:02:59.000000Z",
  },
  {
    id: 4,
    name: "2026/2027",
    start_date: "2025-10-24T00:00:00.000000Z",
    end_date: "2025-10-31T00:00:00.000000Z",
    is_active: false,
    created_at: "2025-10-19T11:41:17.000000Z",
    updated_at: "2025-10-19T12:02:59.000000Z",
  },
];
