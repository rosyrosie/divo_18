import { registerables } from "chart.js";

export const menuList = [
  {title: '키워드 분석', url: '/keyword-analysis'},
  {title: '매출액 분석', url: '/sales-analysis'},
  {title: '키워드 추천', url: '/'},
  {title: '음식점 순위', url: '/'},
  {title: '키워드 매출 연관성', url: '/'},
  {title: '커뮤니티', url: '/'},
];

export const subMenuUrlList = [
  ['/keyword-analysis/search-qty', '/', '/', '/', '/'],
  ['/', '/', '/', '/', '/'],
  ['/', '/', '/', '/', '/'],
  ['/', '/', '/', '/', '/', '/'],
  ['/', '/', '/', '/', '/'],
  ['/', '/', '/', '/', '/'],
];

export const subMenuList = [
  ['키워드 검색량 및 추세', '콘텐츠 발행량 및 추세', '검색자 특성', '온라인 마케팅 정보', '검색량 현황 및 추세 분석'],
  ['매출액 현황', '결제단가 현황', '결제건수 현황', '재방문 고객 현황', '신규 고객 현황'],
  ['최석우', '주형진', '이상현'],
  ['검색량', '요일별 검색 비율', '평일/주말 검색 비율', '연령별 검색 비율', '성별 검색 비율', '기기별 검색 비율'],
  ['내 순위', '상권별 순위', '업종별 순위'],
  ['커뮤니티']
]

export const keywordCommentList = [
  {
    title: '검색량 현황',
    details: [
      '키워드 조회수 증감은 시장 수요의 증감으로 연결됩니다.',
      '지속적으로 소비자들이 자사 관련 키워드를 검색할 수 있도록 온라인 마케팅 활동을 해야 합니다.'
    ]
  },
  {
    title: '검색량 단기 추세',
    details: [
      '현재 키워드 추세의 요인이 점포 내부인지 외부 환경인지 확인해야 합니다.',
      '장기 추세를 함께 고려하여 환경을 분석할 필요가 있습니다.'
    ]
  },
  {
    title: '검색량 장기 추세',
    details: [
      '내 브랜드·상권·업종의 키워드 검색량 장기 추세를 보면 소비자의 니즈 변화를 예측할 수 있습니다.',
      '키워드의 기간별 상승·하락세로 도입기·성장기·성숙기·쇠퇴기를 판단하여 수명주기에 따른 전략을 수립해야 합니다.'
    ]
  },
]

export const userStatComment = [
  '검색자들이 이용하는 키워드 유형과 연령, 성별에 따라 기기의 비중이 달라집니다.',
  '일반적으로 검색자 중 여성이 비중이 높을수록 매출이 높은 경향이 있습니다.',
  '검색자의 요일별 비중이 실제 매장을 이용하는 고객의 요일별 비중과 유사한지 확인해야 합니다.',
  '월별 멘트',
  '검색자의 연령별 비중이 실제 매장을 이용하는 고객의 연령별 비중과 유사한지 확인해야 합니다.'
]

export const lineOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
};

export const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
  maxBarThickness: 80,
};

export const lineData = [
  {
    labels: ['2021.02', '2021.03', '2021.04', '2021.05',' 2021.06', '2021.07', '2021.08', '2021.09', '2021.10', '2021.11', '2021.12', '2022.01'],
    datasets: [
      {
        label: 'PC',
        data: [10, 20, 30, 40, 50, 40, 30, 20, 10, 20, 30, 40],
        borderColor: '#0063b2', 
        backgroundColor: 'rgba(0, 99, 178, 0.5)',
        fill: 'origin'
      },
      {
        label: '모바일',
        data: [90, 80, 70, 60, 50, 60, 70, 80, 90, 80, 70, 60],
        borderColor: '#9cc3d5',
        backgroundColor: 'rgba(156, 195, 213, 0.5)',
        fill: 'origin'
      },
    ]
  },
  {
    labels: ['2021.02', '2021.03', '2021.04', '2021.05',' 2021.06', '2021.07', '2021.08', '2021.09', '2021.10', '2021.11', '2021.12', '2022.01'],
    datasets: [
      {
        label: '남성',
        data: [40, 20, 30, 40, 50, 20, 30, 20, 10, 30, 30, 40],
        borderColor: '#0063b2', 
        backgroundColor: '#0063b2'
      },
      {
        label: '여성',
        data: [10, 80, 70, 60, 40, 60, 70, 80, 50, 80, 70, 60],
        borderColor: '#9cc3d5',
        backgroundColor: '#9cc3d5'
      },
    ]
  },
  {
    labels: ['1월 1주차', '1월 2주차', '1월 3주차', '1월 4주차', '1월 5주차', '2월 1주차', '2월 2주차', '2월 3주차', '2월 4주차', '3월 1주차', '3월 2주차', '3월 3주차'],
    datasets: [
      {
        label: '평일',
        data: [10, 90, 30, 40, 30, 20, 30, 50, 10, 20, 30, 40],
        borderColor: '#0063b2', 
        backgroundColor: '#0063b2'
      },
      {
        label: '주말',
        data: [90, 10, 70, 60, 30, 60, 40, 80, 90, 80, 30, 60],
        borderColor: '#9cc3d5',
        backgroundColor: '#9cc3d5'
      },
    ]
  },
  {
    labels: ['2017', '2018', '2019', '2020',' 2021'],
    datasets: [
      {
        label: '1월',
        data: [1, 1, 1, 1, 1],
        borderColor: '#0063b2', 
        backgroundColor: '#0063b2'
      },
      {
        label: '2월',
        data: [2, 2, 2, 2, 2],
        borderColor: '#9cc3d5',
        backgroundColor: '#9cc3d5'
      },
      {
        label: '3월',
        data: [3, 3, 3, 3, 3]
      },
      {
        label: '4월',
        data: [4, 4, 4, 4, 4]
      }
    ]
  },
  {
    labels: ['2021.02', '2021.03', '2021.04', '2021.05',' 2021.06', '2021.07', '2021.08', '2021.09', '2021.10', '2021.11', '2021.12', '2022.01'],
    datasets: [
      {
        label: '10대',
        data: [10, 20, 30, 40, 50, 40, 30, 20, 10, 20, 30, 40],
        borderColor: '#0063b2', 
        backgroundColor: '#0063b2'
      },
      {
        label: '20대',
        data: [90, 80, 70, 60, 50, 60, 70, 80, 90, 80, 70, 60],
        borderColor: '#9cc3d5',
        backgroundColor: '#9cc3d5'
      },
      {
        label: '30대',
        data: [10, 80, 70, 60, 50, 60, 70, 80, 90, 80, 70, 60],
      },
      {
        label: '40대',
        data: [20, 80, 70, 60, 50, 60, 70, 80, 90, 80, 70, 60],
      },
      {
        label: '50대 이상',
        data: [30, 80, 70, 60, 50, 60, 70, 80, 90, 80, 70, 60],
      },
    ]
  },
];

export const barData = {
  labels: ['PC', '모바일'],
  datasets: [
    {
      label: '최근 30일',
      data: [40, 60],
      backgroundColor: 'rgba(0, 99, 178, 0.5)',
      borderColor: '#0063b2'
    },
    {
      label: '최근 3개월',
      data: [50, 50],
      backgroundColor: 'rgba(156, 195, 213, 0.5)',
      borderColor: '#9cc3d5'
    }
  ]
}

export const radarData = {
  labels: ['일 검색량', '주말 검색 비율', 'MZ 검색 비율', '여성 검색 비율', '모바일 검색 비율'],
  datasets: [
    {
      label: '당산오돌 본점',
      data: [1, 4, 2, 5, 4],
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderColor: 'white',
      borderWidth: 2
    },
    {
      label: '평균',
      data: [3, 2, 1, 4, 5],
      backgroundColor: 'rgba(18, 31, 17, 0.2)',
      borderColor: 'rgba(18, 31, 17)',
      borderWidth: 2
    },
  ]
}

export const salesRadarData = {
  labels: ['매출액', '주말 매출 비율', '저녁 매출 비율', '결제단가', '결제건수', '재방문 매출 비율'],
  datasets: [
    {
      label: '당산오돌 본점',
      data: [3, 2, 1, 4, 5, 1],
      backgroundColor: 'rgba(0, 99, 178, 0.5)',
      borderColor: 'rgba(0, 99, 178)',
      borderWidth: 2
    },
    {
      label: '과거 1개월',
      data: [1, 5, 2, 4, 4, 3],
      backgroundColor: 'rgba(156, 195, 213, 0.5)',
      borderColor: 'rgba(156, 195, 213)',
      borderWidth: 2
    },
    {
      label: '평균',
      data: [1, 4, 2, 5, 4, 5],
      backgroundColor: 'rgba(221, 221, 224, 0.2)',
      borderColor: '#dddde0',
      borderWidth: 2
    },
  ]
}

export const salesRadarOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
  scales: {
    r: {
      min: 0,
      pointLabels: {
        font: {
          size: 11
        }
      },
      ticks: {
        showLabelBackdrop: false,
        stepSize: 1,
        font: {
          weight: 'bold'
        }
      },
    }
  }
}

export const radarOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
  color: '#f5f5f7',
  scales: {
    r: {
      min: 0,
      pointLabels: {
        color: '#f5f5f7',
        font: {
          size: 12
        }
      },
      ticks: {
        showLabelBackdrop: false,
        stepSize: 1,
        color: '#f5f5f7',
        font: {
          weight: 'bold'
        }
      },
      grid: {
        color: 'rgba(245, 245, 247, 0.3)'
      }
    }
  }
}

export const salesLineData = [
  {
    labels: ['2022.02.16', '2022.02.17', '2022.02.18', '2022.02.19', '2022.02.20', '2022.02.21', '2022.02.22'],
    datasets: [
      {
        label: '매출액',
        data: [40, 30, 40, 50, 30, 20, 40],
        borderColor: 'rgba(0, 99, 178)', 
        backgroundColor: 'rgba(0, 99, 178, 0.5)',
        fill: 'origin'
      },
    ]
  },
  {
    labels: ['1월 1주차', '1월 2주차', '1월 3주차', '1월 4주차', '1월 5주차', '2월 1주차', '2월 2주차', '2월 3주차', '2월 4주차', '3월 1주차', '3월 2주차', '3월 3주차'],
    datasets: [
      {
        label: '매출액',
        data: [10, 90, 30, 40, 30, 20, 30, 50, 10, 20, 30, 40],
        borderColor: 'rgba(0, 99, 178)', 
        backgroundColor: 'rgba(0, 99, 178, 0.5)',
        fill: 'origin'
      },
    ]
  },
  {
    labels: ['2021.02', '2021.03', '2021.04', '2021.05',' 2021.06', '2021.07', '2021.08', '2021.09', '2021.10', '2021.11', '2021.12', '2022.01'],
    datasets: [
      {
        label: '매출액',
        data: [10, 20, 30, 40, 50, 40, 30, 20, 10, 20, 30, 40],
        borderColor: 'rgba(0, 99, 178)', 
        backgroundColor: 'rgba(0, 99, 178, 0.5)',
        fill: 'origin'
      },
    ]
  },
];

export const salesLineOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    filler: {
      propagate: false
    }
  },
  // scales: {
  //   x: {
  //     grid: {
  //       color: 'rgba(255, 255, 255, 0.3)',
  //       tickColor: 'rgba(255, 255, 255, 0.3)'
  //     },
  //     ticks: {
  //       color: 'white'
  //     }
  //   },
  //   y: {
  //     grid: {
  //       color: 'rgba(255, 255, 255, 0.3)',
  //       tickColor: 'rgba(255, 255, 255, 0.3)'
  //     },
  //     ticks: {
  //       color: 'white'
  //     }
  //   }
  // }
  
};