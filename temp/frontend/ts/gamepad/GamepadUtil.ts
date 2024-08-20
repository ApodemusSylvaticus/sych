export type ButtonChangeEvent = {
    type: 'button';
    index: number;
    value: number;
};

export type StickChangeEvent = {
    type: 'stick';
    index: number;
    value: number;
};
