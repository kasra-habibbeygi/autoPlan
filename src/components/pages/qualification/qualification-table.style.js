import styled from '@emotion/styled';

export const TableWrapper = styled.div(props => ({
    '& .footer': {
        marginBottom: '30px',
        color: props.theme.colors.error
    },

    '& .wrapper': {
        overflow: 'auto',
        table: {
            margin: '50px 0',
            borderCollapse: 'collapse',

            '& th,td': {
                padding: '10px 20px',
                whiteSpace: 'nowrap'
            },

            thead: {
                tr: {
                    th: {
                        border: `1px solid ${props.theme.colors.textDisable}`,
                        borderTop: 'none',
                        paddingTop: '0'
                    },
                    '& th:first-of-type': {
                        borderRight: 'none'
                    },
                    '& th:last-child': {
                        borderLeft: 'none'
                    }
                }
            },

            tbody: {
                tr: {
                    th: {
                        borderLeft: `1px solid ${props.theme.colors.textDisable}`,
                        borderBottom: `1px solid ${props.theme.colors.textDisable}`
                    }
                },

                '& tr:last-child': {
                    '& th:first-of-type': {
                        borderBottom: 'none'
                    },

                    td: {
                        borderBottom: 'none'
                    }
                },

                td: {
                    border: `1px solid ${props.theme.colors.textDisable}`,
                    color: props.theme.colors.borderTable,

                    '& .radios': {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 0,
                        gap: '8px'
                    },

                    '& .error': {
                        color: props.theme.colors.error
                    }
                },

                '& td:last-child': {
                    borderLeft: 'none'
                },

                input: {
                    width: '30px',
                    textAlign: 'center',
                    color: props.theme.colors.borderTable,
                    border: 'none',

                    '&[type=number]': {
                        '::-webkit-outer-spin-button, ::-webkit-inner-spin-button': {
                            margin: 0,
                            WebkitAppearance: 'none'
                        }
                    }
                },

                '& .input_error': {
                    color: props.theme.colors.error
                }
            }
        }
    }
}));
