import { useEffect, useState } from 'react';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';

interface CustomSelectProps {
  label?: string;
  options: string[] | number[];
  onSelect: (value: string) => void;
  error?: string;
  isDisabled?: boolean;
  id?: string; // 각 Select에 고유한 id를 부여
  value?: any;
}

const CustomSelect = ({
  label,
  options,
  onSelect,
  error,
  isDisabled,
  id,
  value,
}: CustomSelectProps) => {
  console.log('value', value);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(
    value || null,
  );

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option); // 선택된 값 처리
    setIsOpen(false); // 드롭다운 닫기
  };

  // 현재 열려있는 Select를 추적하는 변수 (useEffect 내에서만 관리)
  useEffect(() => {
    if (id) {
      const handleClickOutside = (event: MouseEvent) => {
        console.log(id);

        const selectElement = document.getElementById(id);
        if (selectElement && !selectElement.contains(event.target as Node)) {
          setIsOpen(false); // 외부 클릭 시 드롭다운 닫기
        }
      };

      document.addEventListener('click', handleClickOutside);

      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [id]);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
      id={id}
    >
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
        <div
          onClick={() => !isDisabled && setIsOpen((prev) => !prev)}
          style={{
            padding: '8px',
            borderRadius: '6px',
            border: `1px solid ${error ? 'red' : '#ccc'}`,
            outline: 'none',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>{selectedOption || 'Select an option'}</span>
          {isOpen ? (
            <ArrowDropUp fontSize="small" />
          ) : (
            <ArrowDropDown fontSize="small" />
          )}
        </div>
        {isOpen && !isDisabled && (
          <ul
            style={{
              position: 'absolute',
              top: '100%',
              left: '0',
              width: '100%',
              margin: '0',
              padding: '0',
              listStyle: 'none',
              border: '1px solid #ccc',
              borderRadius: '6px',
              backgroundColor: '#fff',
              maxHeight: '200px',
              overflowY: 'auto',
              zIndex: 100,
            }}
          >
            {options.map((option, index) => (
              <li
                key={index}
                style={{
                  padding: '8px',
                  cursor: 'pointer',
                  backgroundColor: '#fff',
                  borderBottom: '1px solid #ccc',
                }}
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && (
        <span style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
          {error}
        </span>
      )}
    </div>
  );
};

export default CustomSelect;
