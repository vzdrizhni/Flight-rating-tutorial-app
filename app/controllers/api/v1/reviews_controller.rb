class Api::V1::ReviewsController < ApplicationController
    def create
        review = Review.new(review_params)

        if review.save
          render json: ReviewSerializer(review).serialized_json
        else
          render json: {error: review.errors.messages}, status 422
        end
      end

      # DELETE /api/v1/reviews/:id
      def destroy
        review = Review.find(params[:id])

        if review.destroy
          head :no_content
        else
          render json: {error: review.errors.messages}, status 422
        end
      end

      private

      # Strong params
      def review_params
        params.require(:review).permit(:title, :description, :score, :airline_id)
      end
end
