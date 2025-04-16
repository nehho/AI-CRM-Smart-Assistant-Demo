import React from 'react';
import { mockTranscript } from '../../data/mockData';

// 模拟转录处理服务
export const transcribeAudio = (audioFile: File | null): Promise<any> => {
  return new Promise((resolve) => {
    // 模拟API调用延迟
    setTimeout(() => {
      resolve(mockTranscript);
    }, 2000);
  });
};

// 模拟实时录音转录
export const transcribeLiveRecording = (): Promise<any> => {
  return new Promise((resolve) => {
    // 模拟API调用延迟
    setTimeout(() => {
      resolve(mockTranscript);
    }, 2000);
  });
};

// 模拟话者分离
export const diarizeTranscript = (transcript: any): Promise<any> => {
  return new Promise((resolve) => {
    // 模拟API调用延迟
    setTimeout(() => {
      // 话者分离已经包含在mockTranscript中
      resolve(transcript);
    }, 1000);
  });
};
