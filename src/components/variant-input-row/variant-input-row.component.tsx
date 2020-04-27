import React, {ChangeEvent, useCallback, useState} from 'react';
import './variant-input-row.component.styl';

const ENTER_KEY = 'Enter';

type TVariantInputProps = {
    onInputAdd: (input: string) => void;
}

export function VariantInputRow(props: TVariantInputProps): JSX.Element {
    const [inputValue, setInputValue] = useState<string>('');

    const onChange = (value: ChangeEvent<HTMLInputElement>): void => {
        setInputValue(value.target.value);
    };

    const onAdd = useCallback((): void => {
        // TODO block to add already existing value. needs error?
        // TODO clear input if success?
        props.onInputAdd(inputValue);
    }, [props.onInputAdd, inputValue]);

    const handleKeyUp = (event: React.KeyboardEvent) => {
        if (event.key === ENTER_KEY) { onAdd(); }
    };

    return <div className="variant-input-row">
        <input className="variant-input-row__input" type="text" onChange={onChange} onKeyUp={handleKeyUp}/>

        <button className="variant-input-row__add-icon" onClick={onAdd}/>
    </div>
}
