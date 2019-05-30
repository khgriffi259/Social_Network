import { format } from 'date-fns';

export const generateDashboardExperienceTemplate = (data, id) => {
    let html = `
    <tr data-id="${id}">
        <td>${data.company}</td>
        <td class="hide-sm">${data.position}</td>
        <td class="hide-sm">${format(data.start.toDate(), 'MMM YYYY')} - ${format(data.end.toDate(), 'MMM YYYY')}</td>
        <td><button class="btn btn-danger">Delete</button></td>
    </tr>
`;
    return html;
}

export const generateDashboardEducationTemplate = (data, id) => {
    let html = `
    <tr data-id="${id}">
        <td>${data.school}</td>
        <td class="hide-sm">${data.major}</td>
        <td class="hide-sm">${format(data.start.toDate(),'MMM YYYY')} - ${format(data.end.toDate(),'MMM YYYY')}</td>
        <td><button class="btn btn-danger">Delete</button></td>
    </tr>
    `;

    return html;
}
