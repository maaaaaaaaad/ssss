resource "aws_s3_bucket" "shop_images" {
  bucket        = "${var.project_name}-shop-images"
  force_destroy = true

  tags = {
    Name = "${var.project_name}-shop-images"
  }
}

resource "aws_s3_bucket_public_access_block" "shop_images" {
  bucket = aws_s3_bucket.shop_images.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "shop_images_public_read" {
  bucket     = aws_s3_bucket.shop_images.id
  depends_on = [aws_s3_bucket_public_access_block.shop_images]

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.shop_images.arn}/*"
      }
    ]
  })
}
