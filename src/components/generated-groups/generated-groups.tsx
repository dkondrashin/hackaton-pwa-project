import React from 'react';
import './generated-groups.styl';

type TGeneratedGroupsProps = {
    groups: Array<Array<string>>
}

export function GeneratedGroups({ groups }: TGeneratedGroupsProps): JSX.Element {
    const renderGroup = (group: Array<string>) => {
        return <>
            {group.map((value: string) => <div className="generated-group-value" key={value}>{value}</div>)}
        </>;
    };

    if (groups.length === 1) {
        return <div>{renderGroup(groups[0])}</div>;
    }

    const renderGroups = groups.map((group: Array<string>, groupIndex: number) => {
        return <div key={groupIndex}>
            <div className="generated-group-title">Группа {groupIndex + 1}:</div>
            <div className="generated-group-group">{renderGroup(group)}</div>
        </div>;
    });

    return <div className="generated-groups-wrapper">{renderGroups}</div>;
}
