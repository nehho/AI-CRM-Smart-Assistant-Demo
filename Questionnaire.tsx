import React, { useState } from 'react';
import Card from '../layout/Card';
import Button from '../layout/Button';
import Input from '../layout/Input';
import { mockQuestionnaire } from '../../data/mockData';
import { ChevronDownIcon, ChevronUpIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const Questionnaire: React.FC = () => {
  const [questionnaireSections, setQuestionnaireSections] = useState(mockQuestionnaire);
  const [expandedSections, setExpandedSections] = useState<string[]>([questionnaireSections[0].id]);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);

  // 切换展开/折叠部分
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // 处理文本输入变化
  const handleTextChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  // 处理单选变化
  const handleRadioChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  // 处理多选变化
  const handleCheckboxChange = (questionId: string, value: string) => {
    setAnswers(prev => {
      const currentValues = prev[questionId] || [];
      return {
        ...prev,
        [questionId]: currentValues.includes(value)
          ? currentValues.filter((v: string) => v !== value)
          : [...currentValues, value]
      };
    });
  };

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('表单提交:', answers);
    setSubmitted(true);
    
    // 模拟提交后的延迟
    setTimeout(() => {
      window.location.href = '/clients';
    }, 2000);
  };

  // 获取问题的当前值
  const getQuestionValue = (questionId: string, defaultValue: any = '') => {
    // 如果用户已经回答，返回用户的答案
    if (answers[questionId] !== undefined) {
      return answers[questionId];
    }
    
    // 否则查找问题的预设值
    for (const section of questionnaireSections) {
      const question = section.questions.find(q => q.id === questionId);
      if (question && question.value !== undefined) {
        return question.value;
      }
    }
    
    // 如果没有预设值，返回默认值
    return defaultValue;
  };

  // 渲染问题
  const renderQuestion = (question: any, sectionId: string) => {
    const value = getQuestionValue(question.id);
    
    switch (question.type) {
      case 'text':
        return (
          <Input
            label={question.text}
            value={value}
            onChange={(e) => handleTextChange(question.id, e.target.value)}
            required={question.required}
            className={question.needsUpdate ? 'border-yellow-400 dark:border-yellow-600' : ''}
          />
        );
        
      case 'select':
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {question.text}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select
              value={value}
              onChange={(e) => handleTextChange(question.id, e.target.value)}
              className={`input ${question.needsUpdate ? 'border-yellow-400 dark:border-yellow-600' : ''}`}
              required={question.required}
            >
              <option value="">请选择...</option>
              {question.options?.map((option: string) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
        
      case 'radio':
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {question.text}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="space-y-2 mt-2">
              {question.options?.map((option: string) => (
                <div key={option} className="flex items-center">
                  <input
                    type="radio"
                    id={`${question.id}-${option}`}
                    name={question.id}
                    value={option}
                    checked={value === option}
                    onChange={() => handleRadioChange(question.id, option)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-700"
                    required={question.required && !value}
                  />
                  <label
                    htmlFor={`${question.id}-${option}`}
                    className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
            {question.needsUpdate && (
              <p className="mt-1 text-sm text-yellow-600 dark:text-yellow-400">
                此信息需要更新
              </p>
            )}
          </div>
        );
        
      case 'checkbox':
        const checkboxValues = Array.isArray(value) ? value : [];
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {question.text}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="space-y-2 mt-2">
              {question.options?.map((option: string) => (
                <div key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`${question.id}-${option}`}
                    name={question.id}
                    value={option}
                    checked={checkboxValues.includes(option)}
                    onChange={() => handleCheckboxChange(question.id, option)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-700"
                  />
                  <label
                    htmlFor={`${question.id}-${option}`}
                    className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
            {question.needsUpdate && (
              <p className="mt-1 text-sm text-yellow-600 dark:text-yellow-400">
                此信息需要更新
              </p>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };

  // 计算需要更新的问题数量
  const countQuestionsNeedingUpdate = () => {
    let count = 0;
    questionnaireSections.forEach(section => {
      section.questions.forEach(question => {
        if (question.needsUpdate) {
          count++;
        }
      });
    });
    return count;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">动态问卷生成器</h1>
      
      {submitted ? (
        <Card title="提交成功">
          <div className="flex flex-col items-center text-center py-10">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
              <CheckCircleIcon className="h-8 w-8 text-green-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2">问卷已提交成功！</h2>
            <p className="mb-6">感谢您完成问卷，您的信息已更新。</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">正在跳转到客户管理页面...</p>
          </div>
        </Card>
      ) : (
        <>
          <div className="mb-6">
            <Card title="智能问卷">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    基于现有客户资料自动生成的智能问卷
                  </p>
                  <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400 mt-1">
                    {countQuestionsNeedingUpdate()} 个字段需要更新
                  </p>
                </div>
                <div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setExpandedSections(questionnaireSections.map(s => s.id))}
                  >
                    展开全部
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 mb-6">
              {questionnaireSections.map((section) => (
                <Card 
                  key={section.id} 
                  title={
                    <div 
                      className="flex justify-between items-center cursor-pointer w-full"
                      onClick={() => toggleSection(section.id)}
                    >
                      <span>{section.title}</span>
                      <span>
                        {expandedSections.includes(section.id) ? (
                          <ChevronUpIcon className="h-5 w-5" />
                        ) : (
                          <ChevronDownIcon className="h-5 w-5" />
                        )}
                      </span>
                    </div>
                  }
                  className={expandedSections.includes(section.id) ? '' : 'hover:shadow-md transition-shadow duration-200'}
                >
                  {expandedSections.includes(section.id) && (
                    <div className="space-y-4 mt-2">
                      {section.questions.map((question) => (
                        <div key={question.id}>
                          {renderQuestion(question, section.id)}
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              ))}
            </div>
            
            <div className="flex justify-end">
              <Button 
                variant="primary" 
                type="submit"
              >
                提交问卷
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Questionnaire;
