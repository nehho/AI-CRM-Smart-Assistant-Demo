// 模拟转录数据
export interface Speaker {
  id: string;
  name: string;
}

export interface TranscriptSegment {
  id: string;
  speaker: Speaker;
  text: string;
  startTime: number;
  endTime: number;
  isEditing?: boolean;
}

export interface Transcript {
  id: string;
  title: string;
  date: string;
  duration: number;
  segments: TranscriptSegment[];
}

// 模拟客户与客户经理对话
export const mockTranscript: Transcript = {
  id: 'transcript-001',
  title: '投资咨询对话',
  date: '2025-04-15',
  duration: 325, // 秒
  segments: [
    {
      id: 'seg-001',
      speaker: { id: 'rm', name: '客户经理' },
      text: '您好张先生，很高兴今天能和您聊一聊关于投资规划的事情。您最近对哪些投资方向比较感兴趣呢？',
      startTime: 0,
      endTime: 8
    },
    {
      id: 'seg-002',
      speaker: { id: 'client', name: '客户' },
      text: '我最近对科技股很有兴趣，尤其是AI和半导体领域。我觉得这些行业未来几年会有很大的发展空间。',
      startTime: 9,
      endTime: 18
    },
    {
      id: 'seg-003',
      speaker: { id: 'rm', name: '客户经理' },
      text: '确实，AI和半导体是当前非常热门的投资领域。您对这些行业有什么特别的见解吗？',
      startTime: 19,
      endTime: 25
    },
    {
      id: 'seg-004',
      speaker: { id: 'client', name: '客户' },
      text: '我在一家科技公司工作，是做软件开发的。我们公司最近也在积极布局AI应用，所以我比较了解这个领域的发展趋势。我认为未来几年，AI将会渗透到各行各业，带来巨大的商业价值。',
      startTime: 26,
      endTime: 45
    },
    {
      id: 'seg-005',
      speaker: { id: 'rm', name: '客户经理' },
      text: '了解，那您的风险承受能力大概是中高这样吗？',
      startTime: 46,
      endTime: 50
    },
    {
      id: 'seg-006',
      speaker: { id: 'client', name: '客户' },
      text: '对，我希望追求稍高报酬，但又不想太刺激。我今年35岁，有稳定工作，家庭负担不重，可以接受一定程度的波动。',
      startTime: 51,
      endTime: 65
    },
    {
      id: 'seg-007',
      speaker: { id: 'rm', name: '客户经理' },
      text: '除了科技股，您对其他投资品类有兴趣吗？比如房地产、债券或者是一些另类投资？',
      startTime: 66,
      endTime: 75
    },
    {
      id: 'seg-008',
      speaker: { id: 'client', name: '客户' },
      text: '我已经有一套自住房和一套投资房产了，所以房地产方面暂时不打算增加。债券收益太低，不太符合我现阶段的投资目标。我对ESG投资有些兴趣，特别是清洁能源和可持续发展相关的项目。',
      startTime: 76,
      endTime: 95
    },
    {
      id: 'seg-009',
      speaker: { id: 'rm', name: '客户经理' },
      text: '您提到了ESG投资，这确实是近年来越来越受关注的领域。我们有几款ESG主题的基金产品，重点投资于清洁能源、环保科技等可持续发展领域的企业。您对这类产品感兴趣吗？',
      startTime: 96,
      endTime: 115
    },
    {
      id: 'seg-010',
      speaker: { id: 'client', name: '客户' },
      text: '是的，我很感兴趣。我认为环保和可持续发展不仅是社会责任，也是未来的投资机会。不过我对这方面了解不多，希望您能给我一些建议。',
      startTime: 116,
      endTime: 130
    },
    {
      id: 'seg-011',
      speaker: { id: 'rm', name: '客户经理' },
      text: '当然可以。考虑到您的风险偏好和投资兴趣，我建议可以将投资组合分为几个部分：40%配置在科技领域，特别是AI和半导体；30%配置在ESG主题基金；剩余30%可以考虑一些大盘蓝筹股或指数基金，以增加组合的稳定性。您觉得这样的配置如何？',
      startTime: 131,
      endTime: 160
    },
    {
      id: 'seg-012',
      speaker: { id: 'client', name: '客户' },
      text: '听起来不错。我还有一个问题，就是关于投资时间周期的考虑。我打算这笔钱中期持有，大概3-5年，您觉得这样的配置合适吗？',
      startTime: 161,
      endTime: 175
    },
    {
      id: 'seg-013',
      speaker: { id: 'rm', name: '客户经理' },
      text: '3-5年的中期投资周期很适合我们刚才讨论的配置方案。科技和ESG领域正处于成长期，中期内有望获得不错的回报。同时，蓝筹股和指数基金部分可以提供相对稳定的收益和分红。如果市场出现大幅波动，您也有足够的时间等待市场恢复。',
      startTime: 176,
      endTime: 205
    },
    {
      id: 'seg-014',
      speaker: { id: 'client', name: '客户' },
      text: '好的，那我们就按这个方向规划。对了，我还想了解一下税务筹划方面的建议，有什么方式可以合理降低投资收益的税负吗？',
      startTime: 206,
      endTime: 220
    },
    {
      id: 'seg-015',
      speaker: { id: 'rm', name: '客户经理' },
      text: '关于税务筹划，我们可以考虑几个方面：首先，长期持有超过一年的投资通常税率会更低；其次，可以利用税收递延账户，比如某些退休金账户；另外，定期进行税务损失收割(tax-loss harvesting)也是一种策略。不过，具体的税务建议我建议您咨询专业的税务顾问，因为这需要结合您的整体财务状况来规划。',
      startTime: 221,
      endTime: 255
    },
    {
      id: 'seg-016',
      speaker: { id: 'client', name: '客户' },
      text: '明白了，谢谢您的建议。我会考虑找税务顾问详细咨询。那么接下来我们需要做什么呢？',
      startTime: 256,
      endTime: 265
    },
    {
      id: 'seg-017',
      speaker: { id: 'rm', name: '客户经理' },
      text: '接下来我会根据我们今天的讨论，为您准备一份详细的投资建议书，包括具体的产品推荐和配置比例。准备好后我会发送给您审阅。如果您没有其他问题，我们可以安排下一次会面，详细讨论执行计划。',
      startTime: 266,
      endTime: 290
    },
    {
      id: 'seg-018',
      speaker: { id: 'client', name: '客户' },
      text: '好的，我期待收到您的建议书。今天的交流很有帮助，谢谢您的专业意见。',
      startTime: 291,
      endTime: 300
    },
    {
      id: 'seg-019',
      speaker: { id: 'rm', name: '客户经理' },
      text: '不客气，张先生。为客户提供专业的投资建议是我的工作。如果您后续有任何问题，随时可以联系我。祝您有愉快的一天！',
      startTime: 301,
      endTime: 315
    }
  ]
};

// 模拟用户画像数据
export interface UserProfile {
  id: string;
  name: string;
  occupation: string;
  interests: string[];
  investmentPreferences: string[];
  riskTolerance: 'high' | 'medium' | 'low';
  concerns: string[];
  notes: string;
}

export const mockUserProfile: UserProfile = {
  id: 'profile-001',
  name: '张先生',
  occupation: '科技公司软件开发',
  interests: ['科技', 'AI', '可持续发展', 'ESG投资'],
  investmentPreferences: ['科技股', 'AI', '半导体', '清洁能源', '蓝筹股'],
  riskTolerance: 'medium',
  concerns: ['税务筹划', '投资时间周期', '组合稳定性'],
  notes: '客户在科技行业工作，对AI和半导体有专业见解。已有房产投资，对ESG和可持续发展领域表示兴趣。计划中期(3-5年)投资，风险承受能力中等偏上。'
};

// 模拟客户数据
export interface Client {
  id: string;
  name: string;
  lastContacted: string;
  riskLevel: 'high' | 'medium' | 'low';
  tags: string[];
  notes: string;
}

export const mockClients: Client[] = [
  {
    id: 'client-001',
    name: '张先生',
    lastContacted: '2025-04-15',
    riskLevel: 'medium',
    tags: ['科技', 'AI', 'ESG'],
    notes: '对科技和ESG投资感兴趣，风险承受能力中等。'
  },
  {
    id: 'client-002',
    name: '李女士',
    lastContacted: '2025-04-10',
    riskLevel: 'low',
    tags: ['保守型', '退休规划', '固定收益'],
    notes: '退休人士，偏好稳定收益，风险承受能力低。'
  },
  {
    id: 'client-003',
    name: '王先生',
    lastContacted: '2025-04-05',
    riskLevel: 'high',
    tags: ['创业者', '高成长', '另类投资'],
    notes: '创业公司CEO，追求高回报，风险承受能力高。'
  },
  {
    id: 'client-004',
    name: '赵女士',
    lastContacted: '2025-03-28',
    riskLevel: 'medium',
    tags: ['医疗', '教育', '平衡型'],
    notes: '医生，关注医疗和教育领域投资，风险承受能力中等。'
  },
  {
    id: 'client-005',
    name: '陈先生',
    lastContacted: '2025-03-20',
    riskLevel: 'medium',
    tags: ['房地产', '股息', '多元化'],
    notes: '房地产经纪人，偏好稳定股息，投资组合多元化。'
  }
];

// 模拟问卷数据
export interface QuestionnaireSection {
  id: string;
  title: string;
  questions: {
    id: string;
    text: string;
    type: 'text' | 'select' | 'radio' | 'checkbox';
    options?: string[];
    required: boolean;
    needsUpdate?: boolean;
    value?: string | string[];
  }[];
}

export const mockQuestionnaire: QuestionnaireSection[] = [
  {
    id: 'section-001',
    title: '个人基本信息',
    questions: [
      {
        id: 'q-001',
        text: '您的全名',
        type: 'text',
        required: true,
        value: '张先生'
      },
      {
        id: 'q-002',
        text: '您的职业',
        type: 'text',
        required: true,
        value: '科技公司软件开发'
      },
      {
        id: 'q-003',
        text: '您的年龄段',
        type: 'select',
        options: ['18-25岁', '26-35岁', '36-45岁', '46-55岁', '56岁以上'],
        required: true,
        value: '26-35岁'
      },
      {
        id: 'q-004',
        text: '您的联系电话',
        type: 'text',
        required: true,
        needsUpdate: true
      }
    ]
  },
  {
    id: 'section-002',
    title: '财务目标',
    questions: [
      {
        id: 'q-005',
        text: '您的主要投资目标是什么？',
        type: 'radio',
        options: ['资本保值', '稳定收入', '资本增值', '长期财富积累'],
        required: true,
        value: '资本增值'
      },
      {
        id: 'q-006',
        text: '您计划的投资时间周期是？',
        type: 'radio',
        options: ['短期（1年以内）', '中期（1-5年）', '长期（5年以上）'],
        required: true,
        value: '中期（1-5年）'
      },
      {
        id: 'q-007',
        text: '您是否有特定的财务目标？',
        type: 'checkbox',
        options: ['退休规划', '子女教育', '购买房产', '创业资金', '其他'],
        required: false,
        needsUpdate: true
      }
    ]
  },
  {
    id: 'section-003',
    title: '风险评估',
    questions: [
      {
        id: 'q-008',
        text: '如果您的投资在短期内下跌20%，您会：',
        type: 'radio',
        options: [
          '立即卖出以避免更大损失',
          '卖出部分投资以减少风险',
          '持有不变，等待市场恢复',
          '增加投资，利用低价买入机会'
        ],
        required: true,
        needsUpdate: true
      },
      {
        id: 'q-009',
        text: '您如何描述自己的风险承受能力？',
        type: 'radio',
        options: ['保守型，避免风险', '稳健型，适度风险', '进取型，接受较高风险', '激进型，追求高回报'],
        required: true,
        value: '稳健型，适度风险'
      },
      {
        id: 'q-010',
        text: '您的收入来源稳定性如何？',
        type: 'radio',
        options: ['非常稳定', '比较稳定', '一般', '不太稳定'],
        required: true,
        value: '比较稳定'
      }
    ]
  },
  {
    id: 'section-004',
    title: '投资偏好',
    questions: [
      {
        id: 'q-011',
        text: '您对哪些投资领域感兴趣？',
        type: 'checkbox',
        options: ['科技', '医疗健康', '消费', '金融', '房地产', '能源', '工业', '公用事业', 'ESG/可持续发展'],
        required: true,
        value: ['科技', 'ESG/可持续发展']
      },
      {
        id: 'q-012',
        text: '您偏好哪些投资工具？',
        type: 'checkbox',
        options: ['股票', '债券', '基金', 'ETF', '房地产', '另类投资', '现金及等价物'],
        required: true,
        value: ['股票', '基金', 'ETF']
      },
      {
        id: 'q-013',
        text: '您是否有特定的投资限制或偏好？',
        type: 'text',
        required: false,
        needsUpdate: true
      }
    ]
  },
  {
    id: 'section-005',
    title: '遗产规划',
    questions: [
      {
        id: 'q-014',
        text: '您是否已经制定遗产规划？',
        type: 'radio',
        options: ['是', '否', '正在考虑'],
        required: false,
        needsUpdate: true
      },
      {
        id: 'q-015',
        text: '您是否有意向设立信托或基金会？',
        type: 'radio',
        options: ['是', '否', '需要更多信息'],
        required: false,
        needsUpdate: true
      }
    ]
  }
];
