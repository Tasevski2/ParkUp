import { Dropdown, DropdownItem } from './styles';

const DropdownViewer = ({ data = [], width }) => {
    return (
        <Dropdown
            value={data[0] ?? ''}
            displayEmpty
            renderValue={() => (
                <DropdownItem>{data[0] ?? <em>NONE</em>}</DropdownItem>
            )}
            disabled={data.length < 2}
            onClick={(e) => {
                e.stopPropagation();
            }}
            MenuProps={{
                sx: {
                    textAlign: 'center',
                    maxHeight: '250px',
                },
            }}
        >
            {data.slice(1).map((d, index) => (
                <DropdownItem
                    key={index}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    {d}
                </DropdownItem>
            ))}
        </Dropdown>
    );
};

export default DropdownViewer;
