import React, { useState, useEffect } from 'react';
import Card from '../layout/Card';
import Button from '../layout/Button';
import Input from '../layout/Input';
import { mockClients, Client } from '../../data/mockData';
import { MagnifyingGlassIcon, ArrowDownTrayIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';

const ClientTable: React.FC = () => {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClients, setFilteredClients] = useState<Client[]>(mockClients);
  const [activeFilters, setActiveFilters] = useState<{
    riskLevel: string | null;
    tags: string[];
  }>({
    riskLevel: null,
    tags: []
  });
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);

  // 所有可用的标签
  const allTags = Array.from(new Set(mockClients.flatMap(client => client.tags)));

  // 当搜索词或过滤器变化时，更新过滤后的客户列表
  useEffect(() => {
    let result = clients;
    
    // 应用搜索过滤
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(client => 
        client.name.toLowerCase().includes(lowerSearchTerm) ||
        client.notes.toLowerCase().includes(lowerSearchTerm) ||
        client.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm))
      );
    }
    
    // 应用风险等级过滤
    if (activeFilters.riskLevel) {
      result = result.filter(client => client.riskLevel === activeFilters.riskLevel);
    }
    
    // 应用标签过滤
    if (activeFilters.tags.length > 0) {
      result = result.filter(client => 
        activeFilters.tags.some(tag => client.tags.includes(tag))
      );
    }
    
    setFilteredClients(result);
  }, [searchTerm, activeFilters, clients]);

  // 处理搜索输入变化
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // 切换风险等级过滤器
  const toggleRiskFilter = (risk: string) => {
    setActiveFilters(prev => ({
      ...prev,
      riskLevel: prev.riskLevel === risk ? null : risk
    }));
  };

  // 切换标签过滤器
  const toggleTagFilter = (tag: string) => {
    setActiveFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  // 清除所有过滤器
  const clearFilters = () => {
    setActiveFilters({
      riskLevel: null,
      tags: []
    });
    setSearchTerm('');
  };

  // 导出为CSV
  const exportCSV = () => {
    setLoading(true);
    setTimeout(() => {
      // 表头
      const headers = ['ID', '姓名', '最后联系日期', '风险等级', '标签', '备注'];
      
      // 数据行
      const rows = filteredClients.map(client => [
        client.id,
        client.name,
        client.lastContacted,
        client.riskLevel,
        client.tags.join('; '),
        client.notes
      ]);
      
      // 生成CSV内容
      let csvContent = headers.join(',') + '\n';
      rows.forEach(row => {
        // 处理CSV中的特殊字符
        const processedRow = row.map(cell => {
          if (typeof cell === 'string' && (cell.includes(',') || cell.includes('"') || cell.includes('\n'))) {
            return `"${cell.replace(/"/g, '""')}"`;
          }
          return cell;
        });
        csvContent += processedRow.join(',') + '\n';
      });
      
      // 创建下载链接
      const dataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
      const exportFileDefaultName = 'clients_export.csv';
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      setLoading(false);
    }, 500);
  };

  // 获取风险等级的显示样式
  const getRiskBadgeStyle = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">客户管理</h1>
      
      <div className="mb-6">
        <Card>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="搜索客户名称、标签或备注..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="input pl-10"
              />
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                icon={<FunnelIcon className="h-5 w-5" />}
                className={activeFilters.riskLevel || activeFilters.tags.length > 0 ? 'border-primary text-primary' : ''}
              >
                筛选
                {(activeFilters.riskLevel || activeFilters.tags.length > 0) && (
                  <span className="ml-1 bg-primary text-white rounded-full w-5 h-5 inline-flex items-center justify-center text-xs">
                    {(activeFilters.riskLevel ? 1 : 0) + activeFilters.tags.length}
                  </span>
                )}
              </Button>
              
              <Button 
                variant="primary" 
                onClick={exportCSV}
                disabled={loading}
                icon={<ArrowDownTrayIcon className="h-5 w-5" />}
              >
                导出CSV
              </Button>
            </div>
          </div>
          
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">筛选条件</h3>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light"
                >
                  清除全部
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">风险等级</h4>
                  <div className="flex flex-wrap gap-2">
                    {['low', 'medium', 'high'].map(risk => (
                      <button
                        key={risk}
                        onClick={() => toggleRiskFilter(risk)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          activeFilters.riskLevel === risk
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {risk === 'low' ? '低' : risk === 'medium' ? '中' : '高'}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">标签</h4>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => toggleTagFilter(tag)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          activeFilters.tags.includes(tag)
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
      
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  客户
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  最后联系日期
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  风险等级
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  标签
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  备注
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {client.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {client.lastContacted}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRiskBadgeStyle(client.riskLevel)}`}>
                        {client.riskLevel === 'low' ? '低' : client.riskLevel === 'medium' ? '中' : '高'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {client.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                      {client.notes}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.location.href = '/profile'}
                      >
                        查看详情
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                    没有找到匹配的客户记录
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ClientTable;
