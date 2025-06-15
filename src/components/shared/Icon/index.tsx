import React from 'react';
import cs from 'classnames';
import {IconSvg, IconDefinition} from './Icon.generated';
import styles  from './Icon.module.css';
export * from './Icon.generated';


interface Props{
    icon?: IconDefinition
    alt?: string
    style?: React.CSSProperties
    className?: string
    spin?: boolean
}

export function Icon(props: Props){
    if(!props.icon || !IconSvg[props.icon]){
        return null;
    }

    const icon = React.cloneElement(IconSvg[props.icon], {
        style: props.style,
        className: cs(
            styles.Icon,
            props.spin ? styles["Icon--spin"] : undefined,
            props.className,
        ),

        ...(props.alt
            ? {
                children: [
                    <title key="title">{props.alt}</title>,
                    IconSvg[props.icon].props.children,
                ],
            }
        : {}),
    });
    return icon;
}