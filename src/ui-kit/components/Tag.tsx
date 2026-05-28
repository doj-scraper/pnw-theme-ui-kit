import { ReactNode } from 'react';
import { Tag as BPTag, TagProps as BPTagProps } from '@blueprintjs/core';

export interface TagProps extends BPTagProps {
  children?: ReactNode;
}

export function Tag(props: TagProps) {
  return <BPTag {...props} />;
}
