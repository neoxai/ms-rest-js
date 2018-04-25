// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import { DefaultHttpPipelineOptions, HttpPipeline, createDefaultHttpPipeline } from "./httpPipeline";
import { HttpRequest } from "./httpRequest";
import { HttpResponse } from "./httpResponse";
import { Operation } from "./operation";

/**
 * An abstract type that encapsulates a HttpPipeline for derived ServiceClient types.
 */
export abstract class ServiceClient {
  private readonly _httpPipeline: HttpPipeline;

  /**
   * The ServiceClient constructor
   * @param httpPipeline The HttpPipeline that this ServiceClient will use, or the options that will
   * be used to create the default HttpPipeline.
   */
  constructor(httpPipeline?: HttpPipeline | DefaultHttpPipelineOptions) {
    if (httpPipeline) {
      if (httpPipeline instanceof HttpPipeline) {
        this._httpPipeline = httpPipeline;
      } else {
        this._httpPipeline = createDefaultHttpPipeline(httpPipeline);
      }
    } else {
      this._httpPipeline = createDefaultHttpPipeline();
    }
  }

  /**
   * Send the provided HttpRequest through this ServiceClient's HTTP pipeline.
   * @param request The HttpRequest to send through this ServiceClient's HTTP pipeline.
   */
  async sendRequest(request: HttpRequest): Promise<HttpResponse> {
    return await this._httpPipeline.send(request);
  }

  /**
   * Convert the provided operation into a HttpRequest and then send the HttpThrough this
   * ServiceClient's HTTP pipeline.
   * @param operation The Operation to convert into an HttpRequest.
   */
  async sendOperation(operation: Operation): Promise<HttpResponse> {
    if (operation) {
      throw new Error("Not Yet Implemented");
    }
    throw new Error("Not Yet Implemented");
  }
}
