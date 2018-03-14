
export class CMSController {
	static index(req, res) {
		const { cmsPageId } = req.params;
		let response = {};
		switch (cmsPageId) {
			case "content1":
				response = {
					id: cmsPageId,
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
				break;
			case "content2":
				response = {
					id: cmsPageId,
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
				break;
			default:
				response = {
					id: '-1',
					slots: []
				}
		}
		return res.json(response)

	}
}
