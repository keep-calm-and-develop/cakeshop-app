export const STATUS_OPTIONS = [
    {
        label: 'Pending',
        value: 'PENDING',
    },
    {
        label: 'Layering Done',
        value: 'LAYERED',
    },
    {
        label: 'Finishing Done',
        value: 'FINISHED',
    },
    {
        label: 'Fondant Work Finishing Done',
        value: 'FONDANT_FINISHED'
    },
    {
        label: 'Decorating Done',
        value: 'DECORATED',
    },
    {
        label: 'Unapproved',
        value: 'UNAPPROVED',
    },
    {
        label: 'Cancel',
        value: 'CANCELLED',
    },
    {
        label: 'Ready',
        value: 'READY',
    },
    {
        label: 'Completed',
        value: 'COMPLETED',
    },
];

export const PROCESSES = [
    {
        value: 'layering',
        label: 'Layering'
    },
    {
        value: 'finishing',
        label: 'Finishing'
    },
    {
        value: 'fondantFinishing',
        label: 'Fondant Work Finishing'
    },
    {
        value: 'decorating',
        label: 'Decorating'
    },
];

export const NEXT_STATUS_MAPPING = {
    'PENDING': 'LAYERED',
    'LAYERED': 'FINISHED',
    'FINISHED': 'FONDANT_FINISHED',
    'FONDANT_FINISHED': 'DECORATED',
    'DECORATED': 'UNAPPROVED',
};