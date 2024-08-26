export function createButton(id: string, text: string, className: string): HTMLButtonElement {
    const button = document.createElement('button');
    button.id = id;
    button.className = `py-2 px-4 ${className} rounded-lg`;
    button.textContent = text;
    return button;
}

export function createInput(id: string, placeholder: string, type: string = "number"): HTMLInputElement {
    const input = document.createElement('input');
    input.type = type;
    input.id = id;
    input.placeholder = placeholder;
    input.className = "py-2 px-4 border rounded-lg";
    return input;
}

export function createNormalizedSlider(id: string, labelText: string, className: string = "slider-thumb"): HTMLDivElement {
    const card = document.createElement('div');
    card.className = "bg-gray-200 p-4 rounded-lg shadow-sm mb-4";

    const label = document.createElement('label');
    label.htmlFor = id;
    label.textContent = labelText;
    label.className = "block text-sm text-black font-semibold mb-2";

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.id = id;
    slider.className = `w-full h-2 bg-cyan-200 rounded-lg cursor-pointer ${className}`;
    slider.min = "0.0";
    slider.max = "1.0";
    slider.step = "0.0001";

    const input = document.createElement('input');
    input.type = 'number';
    input.id = `${id}-number`;
    input.className = "form-input mt-2 w-full";
    input.min = "0.0";
    input.max = "1.0";
    input.step = "0.0001";
    input.value = "0.0";

    slider.addEventListener('input', () => {
        input.value = slider.value;
    });

    input.addEventListener('input', () => {
        slider.value = input.value;
    });

    card.appendChild(label);
    card.appendChild(slider);
    card.appendChild(input);

    return card;
}

export function createRowSeparator(className: string = "h-4 border-b"): HTMLDivElement {
    const separator = document.createElement('div');
    separator.className = className;
    return separator;
}

export function createSelect(id: string, options: string[]): HTMLSelectElement {
    const select = document.createElement('select');
    select.id = id;
    select.className = "py-2 px-4 border rounded-lg";
    options.forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText.toLowerCase().replace(/\s+/g, "");
        option.textContent = optionText;
        select.appendChild(option);
    });
    return select;
}

export function createDropdown(id: string, elements: HTMLElement[]): HTMLSelectElement {
    const dropdown = document.createElement('select');
    dropdown.id = id;
    dropdown.className = "py-2 px-4 border rounded-lg my-2";
    elements.forEach((element, index) => {
        const option = document.createElement('option');
        option.value = element.id;
        option.textContent = element.getAttribute('data-title');
        dropdown.appendChild(option);
        if (index > 0) element.style.display = 'none';
    });
    dropdown.addEventListener('change', () => {
        elements.forEach(element => {
            element.style.display = element.id === dropdown.value ? '' : 'none';
        });
        queueMicrotask(() => {
            const cardSelector = document.getElementById('card-selector');
            const event = new Event('change');
            cardSelector?.dispatchEvent(event);
        });
    });
    return dropdown;
}

export function createSubCard(id: string, title: string, contentElements: HTMLElement[]): HTMLDivElement {
    const subCard = document.createElement('div');
    subCard.id = id;
    subCard.setAttribute('data-title', title);
    subCard.className = "flex flex-col space-y-2 p-4 rounded-lg border shadow-sm";
    contentElements.forEach(element => subCard.appendChild(element));
    return subCard;
}