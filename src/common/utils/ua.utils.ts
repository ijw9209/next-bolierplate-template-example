import { useMediaQuery } from '@mui/material';

export class UaUtil {
  getUAParser(): object {
    const userAgent = navigator.userAgent;
    // const userAgentData = navigator.userAgentData; // 지원 여부 확인

    let platform = /iPhone|iPad|iPod|Android/i.test(userAgent) ? 'M' : 'P';
    let os = /android/i.test(userAgent)
      ? 'android'
      : /iPhone|iPad|iPod/i.test(userAgent)
      ? 'ios'
      : 'web';

    // 브라우저 감지
    let browserMatch = userAgent.match(/(Edg|Chrome|Firefox|Safari)\/([\d.]+)/);
    let device = browserMatch
      ? `${browserMatch[1]} ${browserMatch[2]}`
      : '알 수 없는 브라우저';

    let params = {
      //   uuid: uuid,
      platform: platform,
      device: device,
      os: os,
      osVersion: '',
      appVersion: '',
      userAgent: userAgent,
    };
    return params;
  }

  getUseIsMobile() {
    const isResponse = useMediaQuery('(max-width: 1075px)');
    return isResponse;
  }
}
