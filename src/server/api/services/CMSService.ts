import { Service } from '../../module/service';

export class CMSService extends Service {

	findByPageId(pageId: string) {
		switch (pageId) {
			case "content1":
				return {
					id: pageId,
					slots: [
						{
							type: "text_image",
							visible: true,
							text: "Ich bin ein Beispiel Text",
							image: {
								url: 'http://via.placeholder.com/350x150'
							}
						},
						{

							type: "text_image",
							visible: true,
							text: "Ich bin ein Beispiel 2 er Text",
							image: {
								url: 'http://via.placeholder.com/350x150'
							},
							slots: [
								{
									type: "text_image",
									visible: true,
									text: "Ich bin ein verschachteleter text wuhu",
									image: {
										url: 'http://via.placeholder.com/350x150'
									}
								},
								{
									type: "text_image",
									visible: false,
									text: "Ich bin ein unsichtbarer text",
									image: {
										url: 'http://via.placeholder.com/350x150'
									}
								}
							]
						}
					]
				};
			case "content2":
				return {
					id: pageId,
					slots: [
						{
							type: "text_image",
							visible: true,
							text: "Ich bin ein einzelner text",
							image: {
								url: 'http://via.placeholder.com/350x150'
							}
						}
					]
				};
			default:
				return {
					id: '-1',
					slots: []
				}

		}
	}
}