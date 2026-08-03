import { api } from "../client";
import { ReadingSession } from "../../types/reading";
import { MessageResponse } from "../../types/message";

export const startReading = async (
  libraryBookId: string,
  startPage: number,
): Promise<MessageResponse> => {
  const res = await api.post<MessageResponse>(
    `/reading/${libraryBookId}/start`,
    { startPage },
  );
  return res.data;
};

interface StopReadingParams {
  libraryBookId: string;
  endPage: number;
}

export const stopReading = async ({
  libraryBookId,
  endPage,
}: StopReadingParams): Promise<MessageResponse> => {
  const res = await api.post<MessageResponse>(
    `/reading/${libraryBookId}/stop`,
    { endPage },
  );
  return res.data;
};

export const getStats = async (
  libraryBookId: string,
): Promise<ReadingSession[]> => {
  const res = await api.get<ReadingSession[]>(
    `/reading/${libraryBookId}/stats`,
  );
  return res.data;
};

interface DeleteSessionParams {
  libraryBookId: string;
  sessionId: string;
}

export const deleteSession = async ({
  libraryBookId,
  sessionId,
}: DeleteSessionParams): Promise<MessageResponse> => {
  const res = await api.delete<MessageResponse>(
    `/reading/${libraryBookId}/sessions/${sessionId}`,
  );
  return res.data;
};
