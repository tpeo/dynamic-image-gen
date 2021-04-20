import { ParsedRequest } from '../api/_lib/types';
const { H, R, copee } = (window as any);
let timeout = -1;

interface ImagePreviewProps {
    src: string;
    onclick: () => void;
    onload: () => void;
    onerror: () => void;
    loading: boolean;
}

const ImagePreview = ({ src, onclick, onload, onerror, loading }: ImagePreviewProps) => {
    const style = {
        filter: loading ? 'blur(5px)' : '',
        opacity: loading ? 0.1 : 1,
    };
    const title = 'Click to copy image URL to clipboard';
    return H('a',
        { className: 'image-wrapper', href: src, onclick },
        H('img',
            { src, onload, onerror, style, title }
        )
    );
}

// interface DropdownOption {
//     text: string;
//     value: string;
// }

// interface DropdownProps {
//     options: DropdownOption[];
//     value: string;
//     onchange: (val: string) => void;
//     small: boolean;
// }

// const Dropdown = ({ options, value, onchange, small }: DropdownProps) => {
//     const wrapper = small ? 'select-wrapper small' : 'select-wrapper';
//     const arrow = small ? 'select-arrow small' : 'select-arrow';
//     return H('div',
//         { className: wrapper },
//         H('select',
//             { onchange: (e: any) => onchange(e.target.value) },
//             options.map(o =>
//                 H('option',
//                     { value: o.value, selected: value === o.value },
//                     o.text
//                 )
//             )
//         ),
//         H('div',
//             { className: arrow },
//             '▼'
//         )
//     );
// }

interface TextInputProps {
    value: string;
    oninput: (val: string) => void;
}

const TextInput = ({ value, oninput }: TextInputProps) => {
    return H('div',
        { className: 'input-outer-wrapper' },
        H('div',
            { className: 'input-inner-wrapper' },
            H('input',
                { type: 'text', value, oninput: (e: any) => oninput(e.target.value) }
            )
        )
    );
}

interface FieldProps {
    label: string;
    input: any;
}

const Field = ({ label, input }: FieldProps) => {
    return H('div',
        { className: 'field' },
        H('label',
            H('div', {className: 'field-label'}, label),
            H('div', { className: 'field-value' }, input),
        ),
    );
}

interface ToastProps {
    show: boolean;
    message: string;
}

const Toast = ({ show, message }: ToastProps) => {
    const style = { transform:  show ? 'translate3d(0,-0px,-0px) scale(1)' : '' };
    return H('div',
        { className: 'toast-area' },
        H('div',
            { className: 'toast-outer', style },
            H('div',
                { className: 'toast-inner' },
                H('div',
                    { className: 'toast-message'},
                    message
                )
            )
        ),
    );
}



// const imageLightOptions: DropdownOption[] = [
//     { text: 'Vercel', value: 'https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-black.svg' },
//     { text: 'Next.js', value: 'https://assets.vercel.com/image/upload/front/assets/design/nextjs-black-logo.svg' },
//     { text: 'Hyper', value: 'https://assets.vercel.com/image/upload/front/assets/design/hyper-color-logo.svg' },
// ];

interface AppState extends ParsedRequest {
    loading: boolean;
    showToast: boolean;
    messageToast: string;
    overrideUrl: URL | null;
    movement: string;
    slug: string;
    bgImage: string;
    actions: string;
}

type SetState = (state: Partial<AppState>) => void;

const App = (_: any, state: AppState, setState: SetState) => {
    const setLoadingState = (newState: Partial<AppState>) => {
        window.clearTimeout(timeout);
        if (state.overrideUrl && state.overrideUrl !== newState.overrideUrl) {
            newState.overrideUrl = state.overrideUrl;
            console.log('new url')
        }
        if (newState.overrideUrl) {
            timeout = window.setTimeout(() => setState({ overrideUrl: null }), 200);
        }

        setState({ ...newState, loading: true });
    };
    const {
        loading = true,
        overrideUrl = null,
        showToast = false,
        messageToast = null,
        movement = 'Do Your Part',
        slug = 'dyp',
        actions ='did-1-thing--did-another-thing',
        bgImage = null
    } = state;
    const url = new URL(window.location.origin);
    url.pathname = 'insta-story';
    url.searchParams.append('movement', movement);
    url.searchParams.append('slug', slug);
    url.searchParams.append('actions', actions);
    if (!!bgImage) url.searchParams.append('bgImage', bgImage);

    return H('div',
        { className: 'split' },
        H('div',
            { className: 'pull-left' },
            H('div',
                H(Field, {
                    label: 'Movement Name',
                    input: H(TextInput, {
                        value: movement,
                        oninput: (val: string) => {
                            console.log('oninput ' + val);
                            setLoadingState({ movement: val, overrideUrl: url });
                        }
                    })
                }),
                H(Field, {
                    label: 'Slug',
                    input: H(TextInput, {
                        value: slug,
                        oninput: (val: string) => {
                            console.log('oninput ' + val);
                            setLoadingState({ slug: val, overrideUrl: url });
                        }
                    })
                }),
                H(Field, {
                    label: 'Background Image',
                    input: H(TextInput, {
                        value: bgImage,
                        oninput: (val: string) => {
                            console.log('oninput ' + val);
                            setLoadingState({ bgImage: val, overrideUrl: url });
                        }
                    })
                }),
                H(Field, {
                    label: 'Actions',
                    input: H(TextInput, {
                        value: actions,
                        oninput: (val: string) => {
                            console.log('oninput ' + val);
                            setLoadingState({ actions: val, overrideUrl: url });
                        }
                    })
                }),
            )
        ),
        H('div',
            { className: 'pull-right' },
            H(ImagePreview, {
                // src: overrideUrl ? overrideUrl.href : url.href,
                src: overrideUrl ?  overrideUrl.href : url.href,
                loading: loading,
                onload: () => setState({ loading: false }),
                onerror: () => {
                    setState({ showToast: true, messageToast: 'Oops, an error occurred' });
                    setTimeout(() => setState({ showToast: false }), 2000);
                },
                onclick: (e: Event) => {
                    e.preventDefault();
                    const success = copee.toClipboard(url.href);
                    if (success) {
                        setState({ showToast: true, messageToast: 'Copied image URL to clipboard' });
                        setTimeout(() => setState({ showToast: false }), 3000);
                    } else {
                        window.open(url.href, '_blank');
                    }
                    return false;
                }
            })
        ),
        H(Toast, {
            message: messageToast,
            show: showToast,
        })
    );
};

R(H(App), document.getElementById('app'));
