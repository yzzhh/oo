from dify_oapi.core.const import APPLICATION_JSON, CONTENT_TYPE
from dify_oapi.core.http.transport import ATransport, Transport
from dify_oapi.core.model.config import Config
from dify_oapi.core.model.request_option import RequestOption

from ..model.get_info_request import GetInfoRequest
from ..model.get_info_response import GetInfoResponse


class Info:
    def __init__(self, config: Config) -> None:
        self.config: Config = config

    def get(self, request: GetInfoRequest, option: RequestOption | None = None) -> GetInfoResponse:
        # 添加 content-type
        if request.body is not None:
            option.headers[CONTENT_TYPE] = f"{APPLICATION_JSON}; charset=utf-8"

        # 发起请求
        return Transport.execute(self.config, request, unmarshal_as=GetInfoResponse, option=option)

    async def aget(self, request: GetInfoRequest, option: RequestOption | None = None) -> GetInfoResponse:
        # 发起请求
        return await ATransport.aexecute(self.config, request, unmarshal_as=GetInfoResponse, option=option)
