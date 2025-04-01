import { SelectHTMLAttributes, forwardRef, useState } from 'react';

//Less : 위 화살표
//More : 아래화살표
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface BaseSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  isDisabled?: boolean;
  options: string[]; // options prop 추가
}

const BaseSelect = forwardRef<HTMLSelectElement, BaseSelectProps>(
  (
    { label, error, isDisabled = false, options, className = '', ...props },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false); // select 열린 상태 추적

    const handleSelectClick = () => {
      setIsOpen((prevState) => !prevState); // select 상태 변경
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        {label && (
          <label style={{ marginBottom: '4px', fontWeight: '500' }}>
            {label}
          </label>
        )}
        <div
          style={{
            position: 'relative',
            display: 'inline-block',
            width: '100%',
          }}
        >
          <select
            ref={ref}
            disabled={isDisabled}
            style={{
              padding: '8px',
              paddingRight: '30px', // 화살표 공간 확보
              borderRadius: '6px',
              border: `1px solid ${error ? 'red' : '#ccc'}`,
              outline: 'none',
              width: '100%',
            }}
            {...props}
          >
            <option value="" disabled>
              Select an option
            </option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          {/* 화살표 아이콘 */}
          <div
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none', // 화살표가 select와 겹쳐도 클릭에 영향 미치지 않도록
            }}
          >
            {isOpen ? (
              <ExpandLess fontSize="small" />
            ) : (
              <ExpandMore fontSize="small" />
            )}
          </div>
        </div>
        {error && (
          <span style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
            {error}
          </span>
        )}
      </div>
    );
  },
);

// 디버깅 컴포넌트 이름
BaseSelect.displayName = 'BaseSelect';

export default BaseSelect;
