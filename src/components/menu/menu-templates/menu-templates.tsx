import { templatesService } from 'components/templates.service';
import React, { useEffect, useState } from 'react';
import './menu-templates.styl';

export function MenuTemplates(): JSX.Element {
    const [templates, setTemplates] = useState(templatesService.getAllTemplatesNames());
    // const [templates, setTemplates] = useState();

    useEffect(() => {
        const subscription = templatesService.templatesUpdate$.subscribe(() => {
            setTemplates(templatesService.getAllTemplatesNames());
        });

        return () => subscription.unsubscribe();
    }, []);

    const selectTemplate = (templateName: string): void => {
        templatesService.selectTemplate(templateName);
    };

    const removeTemplate = (templateName: string): void => {
        templatesService.removeTemplate(templateName);
    };

    const templatesList = templates.map((template: string) => {
      return <div className="menu-curtain__list-sublist-item" key={template}>
          <div
              className="menu-curtain__list-sublist-item-name"
              onClick={selectTemplate.bind(this, template)}
          >
              {template}
          </div>
          <div
              className="menu-curtain__list-sublist-item-remove"
              onClick={removeTemplate.bind(this, template)}
          />
      </div>;
    });

    return <>
        {templatesList}
    </>
}
